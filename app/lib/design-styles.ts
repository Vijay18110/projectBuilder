import {Theme} from './registry';
export const designStyles=[
 {id:'modern',name:'Modern',description:'White surfaces, theme-colored accents, and clear depth.',radius:16,shadow:'strong'},
 {id:'glass',name:'Glassmorphism',description:'Frosted glass, transparent layers, background blur.',radius:16,shadow:'strong'},
 {id:'neumorphism',name:'Neumorphism',description:'Soft raised surfaces and gently inset fields.',radius:18,shadow:'soft'},
 {id:'clay',name:'Claymorphism',description:'Puffy cards, rounded corners, playful pastel depth.',radius:24,shadow:'strong'},
 {id:'minimal',name:'Minimal',description:'Quiet flat surfaces, crisp borders, no shadows.',radius:4,shadow:'none'},
] as const;
export function selectDesignStyle(theme:Theme,id:Theme['designStyle']):Theme{
 const preset=designStyles.find(style=>style.id===id)!;
 return {...theme,designStyle:id,radius:preset.radius,shadow:preset.shadow};
}
