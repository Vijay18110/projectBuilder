'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './StepperExample.module.css';
export default function StepperExample({variant='numbered'}:{variant?:string}){
const [step,setStep]=useState(1);return <div className={`${s.demo} ${s.stack}`}><ol className={`${s.steps} ${variant==='vertical'?s.vertical:''}`} aria-label="Setup steps">{['Account','Workspace','Finish'].map((x,i)=><li key={x} aria-current={step===i?'step':undefined}><button onClick={()=>setStep(i)} className={step===i?s.selected:''}><span>{variant==='dots'?'●':i<step?'✓':i+1}</span>{x}</button></li>)}</ol><div className={s.row}><button className={s.button} disabled={!step} onClick={()=>setStep(step-1)}>Back</button><button className={`${s.button} ${s.primary}`} disabled={step===2} onClick={()=>setStep(step+1)}>Continue</button></div></div>;
}
