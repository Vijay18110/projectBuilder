import {projectTemplates} from './lib/project-templates';
import type {MetadataRoute} from 'next';
import {absolute} from './marketing/site';
export default function sitemap():MetadataRoute.Sitemap{return [{url:absolute('/'),changeFrequency:'weekly',priority:1},{url:absolute('/about'),changeFrequency:'monthly',priority:.6},{url:absolute('/docs'),changeFrequency:'monthly',priority:.8},{url:absolute('/templates'),changeFrequency:'weekly',priority:.9},...projectTemplates.map(t=>({url:absolute('/templates/'+t.id),changeFrequency:'monthly' as const,priority:.7}))]}
