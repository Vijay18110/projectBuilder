'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './MediaPlayerExample.module.css';
export default function MediaPlayerExample({variant='video'}:{variant?:string}){
const [source,setSource]=useState('');useEffect(()=>()=>{if(source)URL.revokeObjectURL(source)},[source]);return <div className={`${s.demo} ${s.stack}`}>{source?(variant==='audio'?<audio src={source} controls style={{width:'100%'}}/>:<video className={s.video} src={source} controls style={{maxHeight:variant==='compact'?120:220}}/>):<div className={s.placeholder}><span aria-hidden="true">▶</span><span className={s.muted}>{variant==='audio'?'Choose an audio file':'Choose a video file'}</span></div>}<label className={s.label}>Local preview<input type="file" accept={variant==='audio'?'audio/*':'video/*'} onChange={e=>{const file=e.target.files?.[0];if(file&&file.type.startsWith(variant==='audio'?'audio/':'video/'))setSource(URL.createObjectURL(file))}} style={{fontSize:10,maxWidth:'100%'}}/></label><span className={s.muted}>Files stay on your device and are not uploaded.</span></div>;
}
