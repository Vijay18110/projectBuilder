import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import assert from 'node:assert/strict';
import catalog from '../app/lib/component-catalog.json';
import Preview from '../app/components/library/ComponentPreview';
let count=0;const errors:string[]=[];const original=console.error;console.error=(...messages)=>errors.push(messages.join(" "));for(const item of catalog)for(const variant of item.variants){const html=renderToStaticMarkup(<Preview id={item.id} variant={variant}/>);assert.ok(html.length>20,`${item.id}/${variant} should render`);count++}console.error=original;assert.equal(errors.length,0,errors.join("\n"));console.log(`${count} component variant server-render checks passed.`);
