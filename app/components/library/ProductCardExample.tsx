'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ProductCardExample.module.css';
export default function ProductCardExample({variant='standard'}:{variant?:string}){
const [added,setAdded]=useState(false);const [liked,setLiked]=useState(false);return <article className={`${s.demo} ${s.product} ${variant==='horizontal'?s.horizontal:''} ${variant==='minimal'?s.minimal:''}`}><div className={s.image} aria-label="Illustrated headphones"><span aria-hidden="true">♬</span><button className={s.like} aria-label={liked?'Remove from wishlist':'Add to wishlist'} aria-pressed={liked} onClick={()=>setLiked(!liked)}>{liked?'♥':'♡'}</button></div><div className={s.info}><span className={s.muted}>EVERYDAY ESSENTIALS</span><h3 className={s.title} style={{marginTop:9}}>Studio headphones</h3><p style={{fontSize:13}}>₹2,499 <del className={s.muted}>₹3,499</del></p><button className={`${s.button} ${s.primary}`} onClick={()=>setAdded(!added)}>{added?'✓ Added to demo cart':'Add to cart'}</button></div></article>;
}
