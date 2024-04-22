import Cardcomp from "@/components/Cardcomp";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 800
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='flex'>
      {isSidebarVisible && (
        <div className='flex-shrink-0 overflow-auto h-screen'>
          <SideBar />
        </div>
      )}
      <div className='flex-grow'>
        <Cardcomp />
      </div>
    </div>
  );
}
