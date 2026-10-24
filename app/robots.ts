import type {MetadataRoute} from 'next';
import {absolute,siteUrl} from './marketing/site';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/dashboard','/api/','/login','/preview-loading','/builder','/overview','/analytics','/customers','/products','/orders','/tables','/forms','/team','/chat','/notifications','/carousel','/profile','/theme','/tasks','/calendar','/help','/components','/*?page=']},sitemap:absolute('/sitemap.xml'),host:siteUrl}}
