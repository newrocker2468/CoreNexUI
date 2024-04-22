import Cardcomp from '@/components/Cardcomp';
import SideBar from '@/components/SideBar';

// issue sidebar taking full height on expanding
export default function Home() {

  return (
    <>
      <div className='flex'>
        <SideBar />

        <Cardcomp />
      </div>
    </>
  );
}

