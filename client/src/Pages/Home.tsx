import Cardcomp from '@/components/Cardcomp';
import SideBar from "@/components/SideBar";

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

