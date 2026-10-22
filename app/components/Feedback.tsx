'use client';
import {createContext,useCallback,useContext,useState,useEffect,ReactNode} from 'react';
import s from './Feedback.module.css';
const Context=createContext<(message:string)=>void>(()=>{});
export function Feedback({children}:{children:ReactNode}){const [messages,setMessages]=useState<{id:number;text:string}[]>([]);const notify=useCallback((text:string)=>{const id=Date.now()+Math.random();setMessages(old=>[...old,{id,text}]);setTimeout(()=>setMessages(old=>old.filter(x=>x.id!==id)),5000)},[]);return <Context.Provider value={notify}>{children}<div className={s.toasts} aria-live="polite">{messages.map(x=><div key={x.id} className={s.toast}>{x.text}<button aria-label="Dismiss notification" onClick={()=>setMessages(old=>old.filter(v=>v.id!==x.id))}>×</button></div>)}</div></Context.Provider>}
export const useToast=()=>useContext(Context);
export function Loading(){return <div role="status" aria-label="Loading" className={s.skeleton}><span/><span/><span/><p>Loading…</p></div>}
export function ErrorState({message,retry}:{message:string;retry:()=>void}){return <div role="alert" className={s.error}><p>{message}</p><button onClick={retry}>Retry</button></div>}
export function Empty({children}:{children:ReactNode}){return <div className={s.empty}>{children}</div>}
export function useDebounced<T>(value:T,delay=250){const [result,setResult]=useState(value);useEffect(()=>{const timer=setTimeout(()=>setResult(value),delay);return()=>clearTimeout(timer)},[value,delay]);return result}
