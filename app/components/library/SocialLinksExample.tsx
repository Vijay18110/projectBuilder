'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SocialLinksExample.module.css';
export default function SocialLinksExample({variant='outline'}:{variant?:string}){
const [copied,setCopied]=useState(false);return <div className={`${s.demo} ${s.stack}`}><div className={s.row}>{['Link','Email','Share'].map(x=><button key={x} aria-label={"Copy example link via "+x} className={`${s.button} ${s[variant]}`} onClick={async()=>{try{await navigator.clipboard.writeText('https://example.com/my-project');setCopied(true)}catch{setCopied(false)}}}>{x==='Link'?'↗':x==='Email'?'✉':'⤴'} {variant==='circle'?'':x}</button>)}</div><p role="status" className={s.muted}>{copied?'Example link copied. No message was sent.':'All three demo actions copy an example link.'}</p></div>;
}
