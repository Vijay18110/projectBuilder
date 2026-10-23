export function componentShareText(name:string,variant:string,component:string,source:string,css:string){
 return `${name} / ${variant}\n\n${component}.tsx\n\`\`\`tsx\n${source}\n\`\`\`\n\n${component}.module.css\n\`\`\`css\n${css}\n\`\`\``;
}
