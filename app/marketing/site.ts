import type {Metadata} from 'next';
const codespace=process.env.CODESPACE_NAME;
const configured=process.env.NEXT_PUBLIC_SITE_URL||process.env.APP_ORIGIN||(codespace?`https://${codespace}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN||'app.github.dev'}`:'http://localhost:3000');
export const siteUrl=new URL(configured).origin;
export const absolute=(path:string)=>new URL(path,siteUrl).href;
export function pageMetadata(title:string,description:string,path:string):Metadata{return {title,description,alternates:{canonical:path},openGraph:{type:'website',siteName:'Forge',title,description,url:path,images:[{url:'/forge-social.png',width:1200,height:630,alt:'Forge — Build it. Theme it. Make it yours.'}]},twitter:{card:'summary_large_image',title,description,images:['/forge-social.png']}}}
export const faqs=[
 {question:'Do I need an account to use Forge?',answer:'The studio opens without a login. You can build a project, explore components, customize its theme, and export source code directly.'},
 {question:'Can I change the design after exporting?',answer:'Yes. Every generated application includes a Theme Builder at /theme. Change colors, design styles, typography, layout, spacing, and light or dark mode, then save your preferences.'},
 {question:'What can I export?',answer:'Choose a Next.js App Router or React/Vite application. Export a complete dashboard, customer workspace, or demonstration storefront, or download individual component variants.'},
 {question:'Does the storefront accept real payments?',answer:'The storefront includes a sample catalog, device-saved cart, and demo orders. Connect a commerce backend and payment provider before accepting real orders.'},
];
