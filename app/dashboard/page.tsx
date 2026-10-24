import type {Metadata} from 'next';
import Workspace from '../components/Workspace';
export const metadata:Metadata={title:'Dashboard Studio',description:'Build and customize your project in Forge Studio.',robots:{index:false,follow:false}};
export const runtime='nodejs';export const dynamic='force-dynamic';
export default function Dashboard(){return <Workspace user={null}/>}
