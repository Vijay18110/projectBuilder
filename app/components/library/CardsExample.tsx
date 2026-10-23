'use client';
import {useState} from 'react';
import s from './CardsExample.module.css';
export default function CardsExample({variant='bordered'}:{variant?:string}){
 const [saved,setSaved]=useState(false);
 return <article className={`${s.demo} ${s.panel} ${s[variant]}`}><div className={s.artwork}><span className={s.orbit}/><span className={s.orbit}/><span className={s.artworkLabel}>FORGE / COLLECTION 001</span></div><div className={s.content}><div className={s.meta}><span className={s.badge}>Design resources</span><span>6 min read</span></div><h3 className={s.title}>Good design starts with a solid foundation.</h3><p className={s.muted}>A considered collection of patterns to help your team build with clarity and confidence.</p><footer className={s.cardFooter}><div className={s.author}><span className={s.avatar}>AC</span><span><strong>Alex Chen</strong><small>Product designer</small></span></div><button className={s.save} aria-pressed={saved} onClick={()=>setSaved(!saved)}>{saved?'✓ Saved':'+ Save'}</button></footer></div></article>
}
