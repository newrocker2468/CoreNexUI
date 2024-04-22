import Cardcomp from '@/components/Cardcomp';
import Sidebarcomp from '@/components/Sidebarcomp';
// issue sidebar taking full width
export default function Home() {

  return (
    <>
      <Sidebarcomp/>
      <div className='ml-[200px]'>
  

        <Cardcomp />
      </div>
    </>
  );
}

