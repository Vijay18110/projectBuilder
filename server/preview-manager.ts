import {spawn,ChildProcess} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdir,writeFile,readFile,unlink,rm} from 'node:fs/promises';
import {resolve,dirname,relative,isAbsolute} from 'node:path';
import {createRequire} from 'node:module';
import {generatePreviewProject} from '../app/lib/preview-project';
import {ExportConfig} from '../app/lib/registry';
import {readStudioSources} from './studio-sources';

type Preview={owner:string;id:string;framework:string;dir:string;port:number;process?:ChildProcess;files:string[];routes:string[];touched:number;log:string;failed:boolean;version?:number;queue:Promise<void>};
const globals=globalThis as typeof globalThis&{forgePreviews?:Map<string,Preview>;forgePreviewTimer?:ReturnType<typeof setInterval>;forgePreviewCleanup?:boolean};
const previews=globals.forgePreviews??=new Map<string,Preview>();
const root=resolve(process.cwd(),'data','previews');
const requireFromWorkspace=createRequire(resolve(process.cwd(),'package.json'));
if(!globals.forgePreviewCleanup){globals.forgePreviewCleanup=true;process.once('exit',()=>{for(const preview of previews.values())preview.process?.kill()});}
const within=(dir:string,path:string)=>{const full=resolve(dir,path);const rel=relative(dir,full);if(rel.startsWith('..')||isAbsolute(rel))throw Error('Invalid preview path');return full};
const freePort=()=>new Promise<number>((done,reject)=>{const server=createServer();server.once('error',reject);server.listen(0,'127.0.0.1',()=>{const port=(server.address() as {port:number}).port;server.close(()=>done(port))})});

async function stop(preview:Preview){
 const child=preview.process;preview.process=undefined;
 if(child&&child.exitCode===null){const exited=new Promise<void>(done=>child.once('exit',()=>done()));child.kill();await Promise.race([exited,new Promise<void>(done=>setTimeout(done,3000))]);}
}
export async function removePreview(owner:string,id:string){const p=previews.get(id);if(!p||p.owner!==owner)return;previews.delete(id);await p.queue.catch(()=>{});await stop(p);await rm(within(root,id),{recursive:true,force:true}).catch(()=>{});}
if(!globals.forgePreviewTimer){globals.forgePreviewTimer=setInterval(()=>{for(const p of previews.values())if(Date.now()-p.touched>15*60_000)void removePreview(p.owner,p.id)},60_000);globals.forgePreviewTimer.unref();}
export async function updatePreview(owner:string,id:string,config:ExportConfig){
 let preview=previews.get(id);
 if(preview&&preview.owner!==owner)throw Error('Preview not found');
 if(!preview){
  if(previews.size>=6)throw Error('Preview capacity reached. Close an existing preview and retry.');
  // One live project per account. Framework changes reuse the same slot.
  const previous=[...previews.values()].find(x=>x.owner===owner);if(previous)await removePreview(owner,previous.id);
  preview={owner,id,framework:config.framework,dir:within(root,id),port:0,files:[],routes:[],touched:Date.now(),log:'',failed:false,queue:Promise.resolve()};previews.set(id,preview);
 }
 const p=preview;p.touched=Date.now();
 const operation=p.queue.catch(()=>{}).then(async()=>{
  const restart=p.framework!==config.framework||!p.process||p.failed||p.version!==3;
  if(restart){await stop(p);p.framework=config.framework;p.port=await freePort();p.failed=false;p.log='';p.version=3;}
  const files=generatePreviewProject(config,readStudioSources());
  // Both compilers use the studio's installed packages; no install runs per change.
  if(config.framework==='next')files['next.config.ts']=`const config={turbopack:{root:${JSON.stringify(process.cwd())}},devIndicators:false};export default config;`;
  else files['vite.config.ts']=`import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import {Readable} from 'node:stream';import {handle} from './server/handler.mjs';export default defineConfig({plugins:[react(),{name:'forge-preview-api',configureServer(server){server.middlewares.use(async(req,res,next)=>{if(!req.url?.startsWith('/api/'))return next();try{const response=await handle(new Request('http://localhost:${p.port}'+req.url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Readable.toWeb(req),duplex:'half'}:{})}));res.statusCode=response.status;response.headers.forEach((v,k)=>res.setHeader(k,v));res.end(Buffer.from(await response.arrayBuffer()))}catch{res.statusCode=500;res.end(JSON.stringify({error:'Preview API unavailable'}))}})}}],server:{host:'127.0.0.1',port:${p.port},strictPort:true,fs:{allow:[${JSON.stringify(process.cwd())}]}}});`;
  await mkdir(p.dir,{recursive:true});
  for(const path of p.files)if(!(path in files))await unlink(within(p.dir,path)).catch(()=>{});
  for(const [path,value] of Object.entries(files)){const dest=within(p.dir,path);await mkdir(dirname(dest),{recursive:true});if(await readFile(dest,'utf8').catch(()=>null)!==value)await writeFile(dest,value);}
  p.files=Object.keys(files);p.routes=config.features.filter(x=>x!=='auth');
  if(restart){
   const cli=config.framework==='next'?requireFromWorkspace.resolve('next/dist/bin/next'):resolve(dirname(requireFromWorkspace.resolve('vite/package.json')),'bin','vite.js');
   const args=config.framework==='next'?[cli,'dev','--hostname','127.0.0.1','--port',String(p.port)]:[cli,'--host','127.0.0.1'];
   const child=spawn(process.execPath,args,{cwd:p.dir,windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,NODE_ENV:'development',NEXT_TELEMETRY_DISABLED:'1',FORGE_PREVIEW:'1',FORGE_PREVIEW_PASSWORD:'PreviewDemo123',FORGE_DB_PATH:resolve(p.dir,'data','preview.sqlite'),SESSION_COOKIE:'forge_preview_'+p.id.replaceAll('-',''),APP_ORIGIN:'http://localhost:'+p.port,EMAIL_WEBHOOK_URL:'',EMAIL_WEBHOOK_TOKEN:''}});p.process=child;
   const log=(chunk:Buffer)=>{p.log=(p.log+chunk.toString()).slice(-6000)};child.stdout?.on('data',log);child.stderr?.on('data',log);
   child.on('error',error=>{p.failed=true;p.log=error.message});child.on('exit',()=>{if(p.process===child)p.failed=true});
  }
 });
 p.queue=operation;await operation;return {id:p.id,port:p.port,framework:p.framework};
}
export async function previewStatus(owner:string,id:string,page?:string){
 const p=previews.get(id);if(!p||p.owner!==owner)return null;p.touched=Date.now();
 if(p.failed)return {state:'error',error:p.log||'Preview process stopped. Retry to restart.'};
 const route=page&&p.routes.includes(page)?page:'';
 try{const response=await fetch(`http://127.0.0.1:${p.port}/${route}`,{signal:AbortSignal.timeout(2500)});if(response.ok){await response.text();return {state:'ready',port:p.port};}if(response.status>=500)return {state:'error',error:'The generated project could not compile. '+p.log.slice(-2500)};}catch{}
 return {state:'starting'};
}
