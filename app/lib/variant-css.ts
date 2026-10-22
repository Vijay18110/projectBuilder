// Remove unselected variant selectors while preserving base and responsive rules.
export function selectVariantCSS(css:string,variants:readonly string[],selected:readonly string[]):string{
 const excluded=variants.filter(value=>!selected.includes(value));if(!excluded.length)return css;
 const escape=(value:string)=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const unwanted=excluded.map(value=>new RegExp('\\.'+escape(value)+'(?![a-zA-Z0-9_-])'));
 let result='',cursor=0;
 while(cursor<css.length){const open=css.indexOf('{',cursor);if(open<0){result+=css.slice(cursor);break}let close=open+1,depth=1,quote='';for(;close<css.length&&depth;close++){const char=css[close];if(quote){if(char===quote&&css[close-1]!=='\\')quote='';continue}if(char==='"'||char==="'"){quote=char;continue}if(char==='{')depth++;if(char==='}')depth--;}
  if(depth)return css;const selector=css.slice(cursor,open).trim(),body=css.slice(open+1,close-1);
  if(/^@(media|supports|container|layer)\b/.test(selector))result+=selector+'{'+selectVariantCSS(body,variants,selected)+'}';
  else if(selector.startsWith('@'))result+=selector+'{'+body+'}';
  else{const selectors=selector.split(',').filter(value=>!unwanted.some(pattern=>pattern.test(value)));if(selectors.length)result+=selectors.join(',')+'{'+body+'}'}cursor=close;
 }
 return result;
}
