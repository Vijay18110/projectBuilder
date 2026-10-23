'use client';
import * as Icons from 'lucide-react';
import s from './Studio.module.css';
export function Icon({name,size=17}:{name:string;size?:number}){const C=(Icons as unknown as Record<string,React.ComponentType<{size:number}>>)[name]||Icons.Box;return <C size={size}/>}
export function Button({children,variant='default',...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:string}){return <button className={`${s.button} ${s[variant]||''}`} {...props}>{children}</button>}
export function Card({title,description,number,children,action}:{title?:string;description?:string;number?:string;children:React.ReactNode;action?:React.ReactNode}){return <section className={s.card}>{title&&<div className={s.cardHead}><div><h2>{number&&<span className={s.sectionNumber}>{number}</span>}{title}</h2>{description&&<p>{description}</p>}</div>{action}</div>}<div className={s.body} style={!title?{paddingTop:"var(--space)"}:undefined}>{children}</div></section>}
export {default} from './BuilderFlow';
