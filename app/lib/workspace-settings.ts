/** A just-applied local theme must survive a reload before cloud debounce completes. */
export function latestWorkspace<T extends {updatedAt?:number}>(local:T,remote:T):T{
 const stamp=(value:T)=>typeof value.updatedAt==='number'&&Number.isFinite(value.updatedAt)?value.updatedAt:0;
 return Object.keys(remote).length&&stamp(remote)>=stamp(local)?remote:local;
}
