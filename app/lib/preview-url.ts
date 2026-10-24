/** Codespaces forwards each port on a separate HTTPS hostname. */
export function previewOrigin(origin:string,port:number){
 const url=new URL(origin);
 if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid preview port');
 if(url.hostname.endsWith('.app.github.dev')&&/-\d+\.app\.github\.dev$/.test(url.hostname)){
  url.hostname=url.hostname.replace(/-\d+(\.app\.github\.dev)$/,'-'+port+'$1');url.port='';
 }else url.port=String(port);
 return url.origin;
}
