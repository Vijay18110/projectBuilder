'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './PaginationExample.module.css';
export default function PaginationExample({variant='outline'}:{variant?:string}){
const [page,setPage]=useState(2);return <div className={`${s.demo} ${s.stack}`}><nav aria-label="Example pagination" className={s.row} style={{gap:5}}><button className={s.page} disabled={page===1} aria-label="Previous page" onClick={()=>setPage(page-1)}>‹</button>{[1,2,3,4].map(p=><button key={p} aria-label={'Page '+p} aria-current={page===p?'page':undefined} className={`${s.page} ${variant==='circle'?s.circle:''} ${page===p?s[variant==='outline'?'outline':'soft']:''}`} onClick={()=>setPage(p)}>{p}</button>)}<button aria-label="Next page" className={s.page} disabled={page===4} onClick={()=>setPage(page+1)}>›</button></nav><span className={s.muted}>Showing {(page-1)*10+1}–{page*10} of 40 results</span></div>;
}
