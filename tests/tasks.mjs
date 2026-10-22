import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createBackend} from '../server/backend-core.mjs';
const dir=mkdtempSync(join(tmpdir(),'forge-tasks-'));
const previous=process.env.FORGE_DB_PATH;
process.env.FORGE_DB_PATH=join(dir,'tasks.sqlite');
let backend=createBackend({auth:false,features:['tasks','calendar'],kinds:['tasks'],sampleData:true});
const call=(method='GET',body)=>backend.handle(new Request('http://localhost/api/records/tasks',{method,...(body?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})}));
try{
 const seeded=await (await call()).json();assert.equal(seeded.length,12);assert.ok(seeded.every(t=>/^\d{4}-\d{2}-\d{2}$/.test(t.end)));
 assert.equal((await call('POST',{name:'Invalid task',category:'Urgent',status:'Pending',end:'invalid'})).status,400);
 const created=await(await call('POST',{name:'Verify launch',description:'Confirm all pages compile',category:'High',status:'Pending',end:'2026-12-01'})).json();assert.ok(created.id);
 assert.equal((await call('POST',{...created,status:'Inactive'})).status,200);
 let rows=await(await call()).json();assert.equal(rows.find(t=>t.id===created.id).status,'Inactive');assert.equal(rows.find(t=>t.id===created.id).end,'2026-12-01');
 assert.equal((await call('DELETE',{id:seeded[0].id})).status,200);
 backend.close();backend=createBackend({auth:false,features:['tasks','calendar'],kinds:['tasks'],sampleData:true});
 rows=await(await call()).json();assert.equal(rows.length,12);assert.ok(!rows.some(t=>t.id===seeded[0].id),'Deleted tasks must not be reseeded');
 console.log('Tasks: starter deadlines, create, complete, delete, and persistence across restart passed.');
}finally{backend.close();if(previous===undefined)delete process.env.FORGE_DB_PATH;else process.env.FORGE_DB_PATH=previous;rmSync(dir,{recursive:true,force:true})}
