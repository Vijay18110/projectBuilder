'use client';
import {useState} from 'react';
import s from './ContactFormExample.module.css';
export default function ContactFormExample({variant='standard'}:{variant?:string}){
 const [done,setDone]=useState(false);
 return <form className={`${s.demo} ${s.form} ${s[variant]}`} onSubmit={event=>{event.preventDefault();setDone(true)}}><header className={s.formHeader}><span className={s.kicker}>LET’S TALK</span><h3>Have something in mind?</h3><p>Tell us a little about your project. We’d love to hear it.</p></header><div className={s.fields}><label className={s.label}>Full name<input className={s.input} required minLength={2} maxLength={80} placeholder="Alex Morgan" autoComplete="name"/></label><label className={s.label}>Work email<input className={s.input} required type="email" placeholder="alex@company.com" autoComplete="email"/></label><label className={`${s.label} ${s.messageField}`}>Project details<textarea className={s.input} required minLength={10} maxLength={1000} rows={3} placeholder="What are you working on?"/></label></div><footer className={s.formFooter}><span>All fields are required.</span><button className={`${s.button} ${s.primary}`} type="submit">Send message <span>↗</span></button></footer>{done&&<p role="status" className={s.confirmation}>✓ Your details are valid. This is a preview; no message was sent.</p>}</form>
}
