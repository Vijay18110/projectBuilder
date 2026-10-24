import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
process.chdir(mkdtempSync(tmpdir()+'/forge-api-'));
const {handle}=process.argv[2]?await import(process.argv[2]):(await import('../server/backend-core.mjs')).createBackend();
let link='';const original=console.log;console.log=(value)=>{if(String(value).startsWith('Development email'))link=String(value).split(': ').slice(1).join(': ')};
async function call(path,body,cookie){return handle(new Request('http://localhost:3000/api/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(cookie?{cookie}:{})},...(body?{body:JSON.stringify(body)}:{})}))}
assert.equal((await call('records/customers')).status,401);
assert.equal((await call('auth/register',{name:'Tester',email:'test@example.com',password:'Strongpass123'})).status,200);
assert.ok(link.includes('/api/auth/verify?token='));assert.equal((await handle(new Request(link))).status,200);
const login=await call('auth/login',{email:'test@example.com',password:'Strongpass123'});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];assert.ok(login.headers.get('set-cookie').includes('HttpOnly'));
assert.equal((await call('records/customers',{name:'Test customer',email:'customer@example.com',amount:42},cookie)).status,200);
assert.equal((await call('records/customers',{name:'Duplicate',email:'customer@example.com',amount:5},cookie)).status,409);assert.equal((await call('records/customers',{name:'Invalid',email:'bad-email',amount:-1},cookie)).status,400);
const rows=await (await call('records/customers',null,cookie)).json();assert.equal(rows.length,1);
assert.equal((await call('auth/me',null,cookie)).status,200);
assert.equal((await call('team',null,cookie)).status,200);
assert.equal((await call('auth/register',{name:'Viewer',email:'viewer@example.com',password:'Viewerpass123'})).status,200);await handle(new Request(link));const viewerLogin=await call('auth/login',{email:'viewer@example.com',password:'Viewerpass123'});const viewerCookie=viewerLogin.headers.get('set-cookie').split(';')[0];assert.equal((await call('records/customers',null,viewerCookie)).status,200);assert.equal((await (await call('records/customers',null,viewerCookie)).json()).length,0);assert.equal((await call('records/customers',{name:'Blocked write',email:'blocked@example.com',amount:10},viewerCookie)).status,403);assert.equal((await call('team',null,viewerCookie)).status,403);assert.equal((await call('records/chat',{name:'A shared test message'},viewerCookie)).status,200);const viewer=await (await call('auth/me',null,viewerCookie)).json();const promoted=await handle(new Request('http://localhost:3000/api/team',{method:'PUT',headers:{cookie,'Content-Type':'application/json'},body:JSON.stringify({id:viewer.id,role:'Manager'})}));assert.equal(promoted.status,200);assert.equal((await call('records/customers',{name:'Allowed write',email:'allowed@example.com',amount:10},viewerCookie)).status,200);
await call('auth/forgot',{email:'test@example.com'});assert.ok(link.includes('?reset='));const token=new URL(link).searchParams.get('reset');assert.equal((await call('auth/reset',{token,password:'Changedpass123'})).status,200);assert.equal((await call('auth/me',null,cookie)).status,401);
console.log=original;console.log('API checks passed: registration, verification, cookie login, authorization, cross-account isolation, roles, CRUD, password recovery, session revocation.');
