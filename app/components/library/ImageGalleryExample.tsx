'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ImageGalleryExample.module.css';
export default function ImageGalleryExample({variant='grid'}:{variant?:string}){
const [selected,setSelected]=useState<number|null>(null);const ref=useRef<HTMLDialogElement>(null);const colors=['var(--primary)','var(--accent)','#dfa86f','#d38aaf'];return <div className={s.demo}><div className={`${s.gallery} ${s[variant]}`}>{colors.map((c,i)=><button key={c} aria-label={'Open abstract artwork '+(i+1)} className={s.art} style={{background:`linear-gradient(${45+i*40}deg,${c},var(--surface))`,height:variant==='masonry'&&i%2?100:75,borderRadius:variant==='rounded'?20:6}} onClick={()=>{setSelected(i);ref.current?.showModal()}}><span aria-hidden="true">{['◒','◇','◕','✦'][i]}</span></button>)}</div><dialog ref={ref} className={s.lightbox} aria-label="Artwork preview"><div className={s.art} style={{height:260,background:`linear-gradient(135deg,${colors[selected||0]},var(--surface))`,fontSize:80}}>{['◒','◇','◕','✦'][selected||0]}</div><button className={s.button} style={{marginTop:15}} onClick={()=>ref.current?.close()}>Close preview</button></dialog></div>;
}
