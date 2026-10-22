const fs=require('node:fs');const source=fs.readFileSync('server/backend-core.mjs','utf8');
const sql=fs.readFileSync('server/migrations/001_initial.sql','utf8');
fs.writeFileSync('server/schema.sql',sql);
fs.writeFileSync('app/lib/backend-template.ts',`export const migrationSQL=${JSON.stringify(sql)};\nexport const backendTemplate=${JSON.stringify(source+"\nconst backend=createBackend({auth:__AUTH_ENABLED__,features:__FEATURES__,kinds:__KINDS__,sampleData:process.env.FORGE_SAMPLE_DATA!=='0'});export const handle=backend.handle;export const seed=backend.seed;\n")};\n`);
fs.writeFileSync('server/handler.mjs',"import {createBackend} from './backend-core.mjs';\nconst backend=createBackend();export const handle=backend.handle;export const seed=backend.seed;\n");
