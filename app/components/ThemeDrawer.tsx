'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import ThemePanel,{ThemePanelProps} from './ThemePanel';
import s from './ThemeDrawer.module.css';

export default function ThemeDrawer({open,onClose,...props}:ThemePanelProps&{open:boolean;onClose:()=>void}){
 const [mounted,setMounted]=useState(false);useEffect(()=>setMounted(true),[]);
 const dialog=useRef<HTMLDialogElement>(null),dismiss=useRef(onClose);dismiss.current=onClose;
 useEffect(()=>{
  const node=dialog.current;if(!node||!open||!mounted)return;
  const opener=document.activeElement instanceof HTMLElement?document.activeElement:null;
  if(!node.open)node.show();
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!event.defaultPrevented&&node.getClientRects().length>0){event.preventDefault();dismiss.current()}};
  const close=()=>dismiss.current();
  document.addEventListener('keydown',escape);window.addEventListener('forge-close-theme-studio',close);
  return()=>{document.removeEventListener('keydown',escape);window.removeEventListener('forge-close-theme-studio',close);const restore=node.contains(document.activeElement);if(node.open)node.close();if(restore&&opener?.isConnected)opener.focus()};
 },[open,mounted]);
 const content=<dialog ref={dialog} className={s.drawer} aria-label="Customize project theme" aria-modal="false" onCancel={e=>{e.preventDefault();dismiss.current()}} onClick={e=>{if(e.target===e.currentTarget)dismiss.current()}}><div className={s.shell}><div className={s.top}><span>PROJECT APPEARANCE</span><button type="button" aria-label="Close theme editor" onClick={onClose} autoFocus>✕</button></div><div className={s.editor}><ThemePanel {...props} apply={()=>{props.apply();onClose()}}/></div></div></dialog>;
 return mounted?createPortal(content,document.body):content
}
