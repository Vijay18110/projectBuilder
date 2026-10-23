'use client';
import {useState} from 'react';
import catalog from '../lib/component-catalog.json';
import {Theme,tokens} from '../lib/registry';
import {selectVariantCSS} from '../lib/variant-css';
import {componentShareText} from '../lib/component-share';
import Preview from './library/ComponentPreview';
import LibraryTabs from './LibraryTabs';
import s from './SharedComponent.module.css';

export default function SharedComponent({id,variant,theme}:{id:string;variant:string;theme:Theme}){
 const [tab,setTab]=useState('React'),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 const item=catalog.find(item=>item.id===id)!;
 const source=item.source.replace(`variant='${item.variants[0]}'`,`variant='${variant}'`),css=selectVariantCSS(item.css,item.variants,[variant]);
 const bundle=componentShareText(item.name,variant,item.component,source,css);
 async function copy(text:string){try{await navigator.clipboard.writeText(text);setStatus('Copied to clipboard.')}catch{setStatus('Select the code and copy it manually.')}}
 async function download(){setBusy(true);try{const response=await fetch('/api/components',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id,variant}],theme})});if(!response.ok)throw Error('Download failed. Please retry.');const url=URL.createObjectURL(await response.blob());const link=document.createElement('a');link.href=url;link.download=`${id}-${variant}.zip`;link.click();setTimeout(()=>URL.revokeObjectURL(url),5000);setStatus('Downloaded React source, CSS, and runnable example.')}catch(error){setStatus(error instanceof Error?error.message:'Download failed.')}finally{setBusy(false)}}
 return <div className={s.page}><style>{tokens(theme)}</style><header className={s.header}><a href="/?page=components" className={s.brand}>forge <span>/ shared components</span></a><div className={s.actions}><button onClick={()=>copy(location.href)}>Copy link</button><button onClick={()=>copy(bundle)}>Copy code + CSS</button><button className={s.primary} onClick={download} disabled={busy}>{busy?'Preparing…':'Download ZIP'}</button></div></header><main><div className={s.heading}><div><span className={s.eyebrow}>{item.category} / PUBLIC COMPONENT</span><h1>{item.name}<span>{variant.replaceAll('-',' ')}</span></h1><p>{item.description}</p></div><span className={s.themeBadge}>Shared theme applied</span></div><div className={s.workspace}><section className={s.previewPanel}><div className={s.panelHeader}><strong>Live preview</strong><span>Interactive · React</span></div><div className={s.preview}><Preview id={id} variant={variant}/></div><div className={s.previewFooter}>The same theme is used in this preview and the downloaded code.</div></section><section className={s.codePanel}><div className={s.panelHeader}><LibraryTabs label="Shared component code" panelId="shared-code" value={tab} options={['React','CSS'].map(value=>({value,label:value}))} onChange={setTab}/><button onClick={()=>copy(tab==='React'?source:css)}>Copy {tab}</button></div><div className={s.filename}>{item.component}{tab==='React'?'.tsx':'.module.css'}</div><pre id="shared-code" role="tabpanel" aria-label={tab+' code'} tabIndex={0}><code>{tab==='React'?source:css}</code></pre></section></div><p className={s.status} role="status">{status||'React + TypeScript + CSS Modules. Ready to use in your project.'}</p></main></div>;
}
