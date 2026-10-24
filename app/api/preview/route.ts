import {z} from 'zod';
import {studioOwner,validStudioOrigin} from '../../../server/studio-request.mjs';
import {exportSchema} from '../../lib/registry';
import {updatePreview,previewStatus,removePreview} from '../../../server/preview-manager';
export const runtime='nodejs';export const dynamic='force-dynamic';
const input=z.object({id:z.string().uuid(),config:exportSchema});
export async function POST(req:Request){
 if(!validStudioOrigin(req))return Response.json({error:'Invalid origin'},{status:403});
 const owner=studioOwner;
 try{const raw=await req.text();if(raw.length>100000)return Response.json({error:'Preview configuration is too large'},{status:413});const parsed=input.safeParse(JSON.parse(raw));if(!parsed.success)return Response.json({error:parsed.error.issues[0].message},{status:400});return Response.json(await updatePreview(owner,parsed.data.id,parsed.data.config));}catch(error){return Response.json({error:error instanceof Error?error.message:'Unable to start preview.'},{status:400});}
}
export async function GET(req:Request){const owner=studioOwner;const params=new URL(req.url).searchParams;const id=params.get('id');if(!id||!z.string().uuid().safeParse(id).success)return Response.json({error:'Invalid preview'},{status:400});const status=await previewStatus(owner,id,params.get('page')||undefined);return Response.json(status||{state:'expired'},{headers:{'Cache-Control':'no-store'}});}
export async function DELETE(req:Request){if(!validStudioOrigin(req))return Response.json({error:'Invalid origin'},{status:403});const owner=studioOwner;const id=new URL(req.url).searchParams.get('id');if(id&&z.string().uuid().safeParse(id).success)await removePreview(owner,id);return Response.json({ok:true});}
