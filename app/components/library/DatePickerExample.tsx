'use client';
import {useState} from 'react';
import DatePicker,{DateRangePicker} from '../DatePicker';
import s from './DatePickerExample.module.css';
export default function DatePickerExample({variant='single'}:{variant?:string}){
 const [date,setDate]=useState(''),[range,setRange]=useState({from:'',to:''});
 return <div className={`${s.demo} ${s.stack} ${s[variant]||''}`}>{variant==='range'?<DateRangePicker value={range} onChange={setRange}/>:<DatePicker label="Choose a date" value={date} onChange={setDate}/>}<span className={s.muted}>{variant==='range'?(range.from?range.from+' → '+(range.to||'Choose end date'):'Choose dates or a quick range'):(date||'No date selected')}</span></div>
}
