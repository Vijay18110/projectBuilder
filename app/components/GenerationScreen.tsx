'use client';
import {useEffect,useState} from 'react';
import {Blocks,Check,Sparkles} from 'lucide-react';
import s from './GenerationScreen.module.css';

export default function GenerationScreen({title='Creating your project',detail='Preparing your pages, components, and responsive layouts.',framework,overlay=false}:{title?:string;detail?:string;framework?:string;overlay?:boolean}){
 const [elapsed,setElapsed]=useState(0);
 useEffect(()=>{const timer=setInterval(()=>setElapsed(value=>value+1),1000);return()=>clearInterval(timer)},[]);
 return <section className={`${s.screen} ${overlay?s.overlay:''}`} aria-busy="true" aria-label={title}><div className={s.glow}/><div className={s.content}><div className={s.badge}><Sparkles size={14}/> FORGE GENERATOR</div><div className={s.orbit}><span/><span/><span/><div className={s.core}><Blocks size={35}/></div></div><h2>{title}<span className={s.dots}>…</span></h2><p role="status">{detail}</p><div className={s.mockup} aria-hidden="true"><div><i/><i/><i/></div><section><aside/><article><b/><b/><b/><em/><em/></article></section></div><div className={s.track}><span/></div><div className={s.meta}><span>{framework||'Your selected technology'}</span><span>{elapsed}s elapsed</span></div><div className={s.checks}><span><Check size={13}/> Responsive layouts</span><span><Check size={13}/> Your selected theme</span><span><Check size={13}/> Editable source</span></div><small>We’ll show your project as soon as it is ready. The first compilation may take a few minutes.</small></div></section>;
}
