/** Validate the browser origin while supporting trusted reverse-proxy headers. */
export function validStudioOrigin(request){
 const origin=request.headers.get('origin');if(!origin)return true;
 // Fetch Metadata describes the browser's original request, before proxy rewrites.
 // Browsers forbid JavaScript from setting Sec-Fetch-* headers; same-site is not enough.
 try{const parsed=new URL(origin);if(!['http:','https:'].includes(parsed.protocol)||parsed.origin!==origin)return false}catch{return false}
 const site=request.headers.get('sec-fetch-site');
 if(site==='same-origin')return true;
 if(site==='cross-site')return false;
 const url=new URL(request.url);const allowed=new Set([url.origin]);
 if(process.env.APP_ORIGIN){try{allowed.add(new URL(process.env.APP_ORIGIN).origin)}catch{}}
 const codespace=process.env.CODESPACE_NAME,domain=process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN||'app.github.dev';
 if(codespace&&/^[a-z0-9-]+$/.test(codespace)&&/^[a-z0-9.-]+$/.test(domain)){
  const port=process.env.PORT||url.port||'3000';
  if(/^\d+$/.test(port))allowed.add('https://'+codespace+'-'+port+'.'+domain);
 }
 const host=request.headers.get('x-forwarded-host')||request.headers.get('host');
 const protocol=request.headers.get('x-forwarded-proto')||url.protocol.replace(':','');
 if(host&&!/[\s,/@\\]/.test(host)&&['http','https'].includes(protocol)){
  try{allowed.add(new URL(protocol+'://'+host).origin)}catch{}
 }
 return allowed.has(origin);
}
export const studioOwner='local-workspace';
