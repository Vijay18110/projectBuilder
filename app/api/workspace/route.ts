import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {studioOwner,validStudioOrigin} from '../../../server/studio-request.mjs';
const file=process.env.FORGE_DB_PATH||'data/workspace.sqlite';mkdirSync(dirname(file),{recursive:true});const db=new DatabaseSync(file);db.exec('PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS workspaces(id TEXT PRIMARY KEY,data TEXT NOT NULL)');
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(){const row=db.prepare('SELECT data FROM workspaces WHERE id=?').get(studioOwner) as {data:string}|undefined;return Response.json(row?JSON.parse(row.data):{})}
export async function PUT(req:Request){if(!validStudioOrigin(req))return Response.json({error:'Invalid origin'},{status:403});const raw=await req.text();if(raw.length>200000)return Response.json({error:'Workspace too large'},{status:413});try{const value=JSON.parse(raw);if(!value||Array.isArray(value)||typeof value!=='object')throw Error();db.prepare('INSERT INTO workspaces VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data').run(studioOwner,JSON.stringify(value));return Response.json({saved:true})}catch{return Response.json({error:'Invalid workspace'},{status:400})}}
