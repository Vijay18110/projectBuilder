import type { Metadata } from 'next';
import {siteUrl} from './marketing/site';
import './globals.css';
import './dropdowns.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Forge — Build it. Theme it. Make it yours.',template:'%s | Forge'},description:'Build your dashboard. Make it yours. Export your next project.',icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'}],apple:'/apple-touch-icon.png'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
