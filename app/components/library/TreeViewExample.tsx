'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TreeViewExample.module.css';
export default function TreeViewExample({variant='standard'}:{variant?:string}){
return <nav aria-label="Example project files" className={`${s.demo} ${s.tree} ${variant==='bordered'?s.panel:''} ${s[variant]}`}><details open><summary>▾ my-project</summary><div><details open><summary>▸ src</summary><div><details><summary>▸ components</summary><div><span>◇ Button.tsx</span><span>◇ Card.tsx</span></div></details><span>◇ App.tsx</span><span>◇ globals.css</span></div></details><details><summary>▸ public</summary><div><span>◇ favicon.svg</span></div></details><span>◇ package.json</span></div></details></nav>;
}
