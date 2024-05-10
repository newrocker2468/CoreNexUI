import Cardcomp from "@/components/Cardcomp";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const refreshToken = urlParams.get("refreshToken");

    if (!token || !refreshToken) return;

    const currentToken = Cookies.get("token");
    const currentRefreshToken = Cookies.get("refreshToken");

    if (currentToken || currentRefreshToken) return;

    Cookies.set("token", token);
    Cookies.set("refreshToken", refreshToken);
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
