import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {handle} from '../server/handler.mjs';
import Workspace from './components/Workspace';
export const runtime='nodejs';export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{reset?:string}>}){const params=await searchParams;if(params.reset)redirect('/login?reset='+encodeURIComponent(params.reset));const h=await headers();const response=await handle(new Request('http://localhost:3000/api/auth/me',{headers:{cookie:h.get('cookie')||''}}));if(!response.ok)redirect('/login');const user=await response.json();return <Workspace user={user}/>}
