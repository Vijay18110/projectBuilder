'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './PricingExample.module.css';
export default function PricingExample({variant='standard'}:{variant?:string}){
const [annual,setAnnual]=useState(false);const [chosen,setChosen]=useState(false);return <article className={`${s.demo} ${s.panel} ${s[variant]}`}><div className={s.row} style={{justifyContent:'space-between'}}><span className={s.badge}>Pro plan</span><button className={s.billing} onClick={()=>setAnnual(!annual)}>{annual?'Annual · save 20%':'Monthly'} ⌄</button></div><h3 style={{fontSize:32,margin:'14px 0 4px'}}>₹{annual?'799':'999'}<small className={s.muted} style={{fontSize:12}}>/month</small></h3><p className={s.muted}>For teams ready to build together.</p><ul className={s.features}><li>✓ Unlimited projects</li><li>✓ Shared design system</li><li>✓ Priority support</li></ul><button className={`${s.button} ${s.primary}`} style={{width:'100%'}} onClick={()=>setChosen(!chosen)}>{chosen?'✓ Plan selected':'Choose Pro'}</button><p className={s.muted}>Example pricing · no payment collected</p></article>;
}
