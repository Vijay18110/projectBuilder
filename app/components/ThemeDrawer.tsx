'use client';
import {useEffect,useRef} from 'react';
import ThemePanel,{ThemePanelProps} from './ThemePanel';
import s from './ThemeDrawer.module.css';

export default function ThemeDrawer({open,onClose,...props}:ThemePanelProps&{open:boolean;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),dismiss=useRef(onClose);dismiss.current=onClose;
 useEffect(()=>{
  const node=dialog.current;if(!node||!open)return;
  const opener=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const previous=document.body.style.overflow;
  if(!node.open)node.showModal();document.body.style.overflow='hidden';
  return()=>{if(node.open)node.close();document.body.style.overflow=previous;if(opener?.isConnected)opener.focus()};
 },[open]);
 return <dialog ref={dialog} className={s.drawer} aria-label="Customize project theme" onCancel={e=>{e.preventDefault();dismiss.current()}} onClick={e=>{if(e.target===e.currentTarget)dismiss.current()}}><div className={s.shell}><div className={s.top}><span>PROJECT APPEARANCE</span><button type="button" aria-label="Close theme editor" onClick={onClose} autoFocus>✕</button></div><div className={s.editor}><ThemePanel {...props} apply={()=>{props.apply();onClose()}}/></div></div></dialog>
}
