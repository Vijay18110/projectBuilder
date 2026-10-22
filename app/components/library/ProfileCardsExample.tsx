'use client';
import {useState,useRef} from 'react';
import s from './ProfileCardsExample.module.css';
export default function ProfileCardsExample({variant='standard'}:{variant?:string}){const [following,setFollowing]=useState(false);return <article className={[s.demo,s.panel,s[variant]].join(' ')}><div className={s.avatar} aria-label="Alex Morgan">AM</div><div><h3>Alex Morgan</h3><p className={s.muted}>Product designer · sample profile</p><button className={s.button} aria-pressed={following} onClick={()=>setFollowing(!following)}>{following?'Following':'Follow'}</button></div></article>}