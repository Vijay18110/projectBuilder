'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TableExample.module.css';
export default function TableExample({variant='standard'}:{variant?:string}){
const [sort,setSort]=useState(false);const rows=[['Olivia','Active','₹2,400'],['Phoenix','Pending','₹1,850'],['Lana','Active','₹3,200']].sort((a,b)=>sort?a[0].localeCompare(b[0]):0);return <div className={`${s.demo} ${s.scroll}`}><table className={`${s.table} ${s[variant]}`}><thead><tr><th><button className={s.sort} onClick={()=>setSort(!sort)}>Name ↕</button></th><th>Status</th><th>Value</th></tr></thead><tbody>{rows.map(([name,status,value])=><tr key={name}><td>{name}</td><td><span className={s.badge}>{status}</span></td><td>{value}</td></tr>)}</tbody></table></div>;
}
