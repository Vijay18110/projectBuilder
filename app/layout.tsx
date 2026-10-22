import type { Metadata } from 'next';
import './globals.css';
import './dropdowns.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
export const metadata:Metadata={title:'Forge — Dashboard Studio',description:'Build your dashboard. Make it yours. Export your next project.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
