'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './CartSummaryExample.module.css';
export default function CartSummaryExample({variant='standard'}:{variant?:string}){
const [qty,setQty]=useState(1);const [done,setDone]=useState(false);return <div className={`${s.demo} ${s.panel} ${s[variant]}`}><h3 className={s.title}>Order summary</h3><div className={s.row} style={{justifyContent:'space-between',fontSize:12}}><span>Studio headphones × {qty}</span><button className={s.button} style={{padding:'3px 8px'}} onClick={()=>{setQty(qty===3?1:qty+1);setDone(false)}}>＋</button></div><hr className={s.separator}/><div className={s.row} style={{justifyContent:'space-between',fontSize:12}}><span>Shipping</span><span className={s.success}>Free</span></div><div className={s.row} style={{justifyContent:'space-between',margin:'14px 0'}}><strong>Total</strong><strong>₹{(qty*2499).toLocaleString('en-IN')}</strong></div><button className={`${s.button} ${s.primary}`} style={{width:'100%'}} onClick={()=>setDone(true)}>{done?'✓ Preview complete':'Continue to checkout'}</button><p role="status" className={s.muted}>Demo only · no order or payment is created.</p></div>;
}
