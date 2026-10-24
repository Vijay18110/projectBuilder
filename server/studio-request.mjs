/** Validate the browser origin while supporting trusted reverse-proxy headers. */
export function validStudioOrigin(request){
 const origin=request.headers.get('origin');if(!origin)return true;
 const url=new URL(request.url);const allowed=new Set([url.origin]);
 if(process.env.APP_ORIGIN){try{allowed.add(new URL(process.env.APP_ORIGIN).origin)}catch{}}
 const host=request.headers.get('x-forwarded-host')||request.headers.get('host');
 const protocol=request.headers.get('x-forwarded-proto')||url.protocol.replace(':','');
 if(host&&!/[\s,/@\\]/.test(host)&&['http','https'].includes(protocol)){
  try{allowed.add(new URL(protocol+'://'+host).origin)}catch{}
 }
 return allowed.has(origin);
}
export const studioOwner='local-workspace';
