require('./source-checks.cjs');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const assert = require('node:assert/strict');
const Library = require('../app/components/ComponentLibrary.tsx').default;
const {defaultTheme} = require('../app/lib/registry.ts');
const catalog = require('../app/lib/component-catalog.json');
const fs = require('node:fs');
const {componentShareText} = require('../app/lib/component-share.ts');
const bundle=componentShareText('Buttons','solid','ButtonsExample','export default function Button() {}','.solid{color:white}');
assert.ok(bundle.includes('ButtonsExample.tsx\n```tsx\nexport default function Button() {}'));
assert.ok(bundle.includes('ButtonsExample.module.css\n```css\n.solid{color:white}'));
for(const item of catalog){
  assert.equal(item.source,fs.readFileSync('app/components/library/'+item.component+'.tsx','utf8'),'Shared/exported source matches live preview');
  assert.equal(item.css,fs.readFileSync('app/components/library/'+item.component+'.module.css','utf8'),'Shared/exported styles match live preview');
}
const {layoutSource} = require('../app/lib/templates/layout-template.ts');
for(const source of [layoutSource,fs.readFileSync('app/layouts/DashboardLayout.tsx','utf8')]) {
  assert.ok(!source.includes('if(sec.isNested)'), 'Components submenu must stay removed, including after template sync');
  assert.ok(source.includes("{title:'Library',items:['components']"), 'Components must be a direct navigation link');
}
const html = renderToStaticMarkup(React.createElement(Library, {theme:defaultTheme,notify:()=>{}}));
const count = catalog[0].variants.length;
assert.equal((html.match(/Code &amp; styles/g)||[]).length,count);
assert.ok(html.includes('Search components'));
assert.ok(html.includes('aria-label="Components"'));
assert.equal((html.match(/>Share<\/button>/g)||[]).length,count);
assert.equal((html.match(/>Download<\/button>/g)||[]).length,count);
for(const item of catalog) assert.ok(html.includes(renderToStaticMarkup(React.createElement('span',null,item.name))),item.name+' appears in sidebar');
const SharedComponent=require('../app/components/SharedComponent.tsx').default;
const sharedHTML=renderToStaticMarkup(React.createElement(SharedComponent,{id:catalog[0].id,variant:catalog[0].variants[0],theme:{...defaultTheme,primary:'#15876a'}}));
assert.ok(sharedHTML.includes('--primary:#15876a'),'Shared view retains selected theme');
assert.ok(sharedHTML.includes('Copy code + CSS'));
assert.ok(sharedHTML.includes('Live preview'));
assert.ok(sharedHTML.includes('Download ZIP'));
assert.ok(sharedHTML.includes(catalog[0].component+'.tsx'));
const publicPage=fs.readFileSync('app/share/components/[id]/[variant]/page.tsx','utf8');
assert.ok(!publicPage.includes('/auth/me'),'Public code page does not require login');
assert.ok(publicPage.includes('themeSchema.safeParse'),'Shared theme is validated');
console.log('Library sidebar, search, every selected component variant, and per-variant code/share/download actions render correctly.');
