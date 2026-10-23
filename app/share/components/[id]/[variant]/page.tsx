import {notFound} from 'next/navigation';
import catalog from '../../../../lib/component-catalog.json';
import {defaultTheme,themeSchema} from '../../../../lib/registry';
import SharedComponent from '../../../../components/SharedComponent';

export default async function SharedComponentPage({params,searchParams}:{params:Promise<{id:string;variant:string}>;searchParams:Promise<{theme?:string}>}){
 const {id,variant}=await params;
 const item=catalog.find(item=>item.id===id);
 if(!item||!item.variants.includes(variant))notFound();
 const query=await searchParams;
 let theme=defaultTheme;
 try{if(query.theme&&query.theme.length<10000){const parsed=themeSchema.safeParse(JSON.parse(query.theme));if(parsed.success)theme=parsed.data}}catch{}
 return <SharedComponent id={id} variant={variant} theme={theme}/>;
}
