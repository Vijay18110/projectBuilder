'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './AccordionExample.module.css';
export default function AccordionExample({variant='bordered'}:{variant?:string}){
return <div className={`${s.demo} ${s.accordion} ${s[variant]}`}>{[['Can I customize the theme?','Yes. Every component follows the same shared design tokens.'],['Can I use this with Next.js?','Yes. The component is a client component with its own CSS Module.'],['Is it responsive?','The layouts adapt to their available width.']].map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span aria-hidden="true">＋</span></summary><p className={s.muted}>{a}</p></details>)}</div>;
}
