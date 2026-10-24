import type {MetadataRoute} from 'next';
import {absolute} from './marketing/site';
export default function sitemap():MetadataRoute.Sitemap{return [{url:absolute('/'),changeFrequency:'weekly',priority:1},{url:absolute('/about'),changeFrequency:'monthly',priority:.6},{url:absolute('/docs'),changeFrequency:'monthly',priority:.8}]}
