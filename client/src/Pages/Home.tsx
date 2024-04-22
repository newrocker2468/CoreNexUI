import Cardcomp from '@/components/Cardcomp';
<<<<<<< HEAD
import Sidebarcomp from '@/components/Sidebarcomp';
// issue sidebar taking full width
=======
import SideBar from "@/components/SideBar";

>>>>>>> e2a9d48ac61d9b5552415a776b611da0fbf64a3d
export default function Home() {

  return (
    <>
<<<<<<< HEAD
      <Sidebarcomp/>
      <div className='ml-[200px]'>
  
=======
      <div className='flex'>
        <SideBar />
 
          <Cardcomp />
>>>>>>> e2a9d48ac61d9b5552415a776b611da0fbf64a3d

      </div>
    </>
  );
}

