import {createBackend} from './backend-core.mjs';
import {validStudioOrigin} from './studio-request.mjs';
const backend=createBackend({auth:false});
export async function handle(request){
 const url=new URL(request.url);
 if(/^\/api\/auth(?:\/|$)/.test(url.pathname)||/^\/api\/team(?:\/|$)/.test(url.pathname))return Response.json({error:'Account functionality is disabled in this studio'},{status:404});
 if(!['GET','HEAD'].includes(request.method)&&!validStudioOrigin(request))return Response.json({error:'Invalid origin'},{status:403});
 // Studio data belongs to one shared workspace; old login cookies are ignored.
 const headers=new Headers(request.headers);headers.delete('cookie');headers.delete('origin');
 return backend.handle(new Request(request,{headers}));
}
export const seed=backend.seed;
