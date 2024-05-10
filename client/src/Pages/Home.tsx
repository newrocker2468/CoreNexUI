import Cardcomp from "@/components/Cardcomp";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

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

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token = urlParams.get("token");
  //   const refreshToken = urlParams.get("refreshToken");

  //   if (!token || !refreshToken) return;

  //   Cookies.set("token", token, {
  //     expires: 60 * 60 * 1000, // 1 hour
  //     sameSite: "none",
  //     secure: true,
  //     // domain: `${import.meta.env.VITE_BASE_URL}`,
  //   });
  //   Cookies.set("refreshToken", refreshToken, {
  //     expires: 7 * 24 * 60 * 60 * 1000, // 7 days
  //     sameSite: "none",
  //     secure: true,
  //     // domain: `${import.meta.env.VITE_BASE_URL}`,
  //   });
  // }, []);

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
