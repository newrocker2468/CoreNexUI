import Sidebar from '@/components/SideBar';
import LiveEditor from '@/components/LiveEditor';
import { Link } from 'react-router-dom';
export default function Csselements() {
    return (
      <>
        <div className='flex '>
          <Sidebar />
          <h1 className='text-center '>
<Link to='/Editor'>Editor</Link>
          </h1>
        </div>
      </>
    );
}