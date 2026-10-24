import {useId} from 'react';
/** Forge's cut-metal F: one mark across the studio and component library. */
export default function BrandMark({size=36}:{size?:number}){
 const id=useId().replaceAll(':','');
 return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false"><defs><linearGradient id={id} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse"><stop stopColor="var(--primary,#6258e8)"/><stop offset="1" stopColor="var(--accent,#2da88b)"/></linearGradient></defs><rect x="1" y="1" width="46" height="46" rx="13" fill={`url(#${id})`}/><rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke="white" strokeOpacity=".2"/><path d="M13 11H36L31 18H21V23H31L26 30H21V37H13V11Z" fill="white"/><path d="M30 32H36V38H30V32Z" fill="white" fillOpacity=".55"/></svg>
}
