'use client';
import {useRef,useState} from 'react';
import s from './DropdownExample.module.css';
export default function DropdownExample({variant='outline'}:{variant?:string}){
 const [action,setAction]=useState(''),menu=useRef<HTMLDetailsElement>(null);
 const actions=[{name:'Duplicate project',hint:'Create a working copy',icon:'⧉',key:'D'},{name:'Move to folder',hint:'Keep your workspace organised',icon:'↗',key:'M'},{name:'Archive project',hint:'Move out of your active projects',icon:'▣',key:'A'}];
 return <div className={s.demo}><details className={s.dropdown} ref={menu}><summary className={`${s.button} ${s[variant]}`}><span>Project actions</span><span aria-hidden="true">⌄</span></summary><div className={s.menu}><div className={s.menuHeader}><strong>Design system</strong><span>Project settings & actions</span></div>{actions.map(entry=><button key={entry.name} type="button" className={s.menuItem} onClick={()=>{setAction(entry.name+' selected');if(menu.current)menu.current.open=false}}><span className={s.actionIcon} aria-hidden="true">{entry.icon}</span><span className={s.actionText}><strong>{entry.name}</strong>{(variant==='elevated'||variant==='soft')&&<small>{entry.hint}</small>}</span>{variant!=='framed'&&<kbd>{entry.key}</kbd>}</button>)}<div className={s.menuFooter}>Actions apply to this project</div></div></details><p role="status" className={s.muted}>{action||'Open the menu to explore project actions.'}</p></div>
}
