'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './CodeBlockExample.module.css';
export default function CodeBlockExample({variant='standard'}:{variant?:string}){
const [language,setLanguage]=useState('React');const [copied,setCopied]=useState(false);const code=language==='React'?'export default function Hello() {\n  return <h1>Make something great.</h1>;\n}':'.hello {\n  color: var(--primary);\n  border-radius: var(--radius);\n}';return <div className={`${s.demo} ${s.codebox} ${variant==='terminal'?s.terminal:''}`}><div className={s.codehead}><button onClick={()=>{setLanguage(language==='React'?'CSS':'React');setCopied(false)}}>{language} ⌄</button><button onClick={async()=>{try{await navigator.clipboard.writeText(code);setCopied(true)}catch{setCopied(false)}}}>{copied?'✓ Copied':'Copy code'}</button></div><pre><code>{code}</code></pre></div>;
}
