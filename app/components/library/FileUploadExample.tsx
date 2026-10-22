'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './FileUploadExample.module.css';
export default function FileUploadExample({variant='dropzone'}:{variant?:string}){
const [name,setName]=useState('');const [error,setError]=useState('');return <div className={s.demo}><label className={`${s.upload} ${variant==='soft'?s.soft:''} ${variant==='compact'?s.compact:''}`}><span style={{fontSize:25}}>↥</span><strong>Choose an image or PDF</strong><span className={s.muted}>PNG, JPEG, WebP or PDF · up to 5 MB</span><input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onChange={e=>{const file=e.target.files?.[0];if(!file)return;if(!['image/png','image/jpeg','image/webp','application/pdf'].includes(file.type)||file.size>5*1024*1024){setError('Choose a supported file under 5 MB.');setName('');return}setName(file.name);setError('')}}/></label>{name&&<p className={s.muted}>Selected: {name} <button className={s.button} onClick={()=>setName('')}>Clear</button></p>}{error&&<p role="alert" className={s.error}>{error}</p>}<p className={s.muted}>Local preview only; files are not uploaded.</p></div>;
}
