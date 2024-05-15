import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Btn from "@/components/Btn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@nextui-org/react";
import HamburgerLight from "@/Icons/hamburgerlight.svg";
import HamburgerDark from "@/Icons/hamburgerdark.svg";
import { useTheme } from "./theme-provider";
import UserContext from "./UserContext";
import SideBar from "./SideBar";
import { ModeToggle } from "./mode-toggle";
import LoginWithEmail from "./LoginWithEmail";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NavBarShortScreen() {
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserContext);
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
        withCredentials: true,
      });
      // console.log(response);
      setUser((prevState) => ({
        ...prevState,
        userName: "",
        avatarProps:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
        highres_img:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
        isLoggedIn: false,
        Loginwithgoogle: false,
        Loginwithgithub: false,
        Permissions: ["newuser"],
      }));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // useEffect(() => {
  //   console.log(isSidebarOpen);
  // }, [isSidebarOpen]);

  return (
    <Sheet
      open={isSidebarOpen}
      onOpenChange={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <SheetTrigger asChild>
        <Button
          variant='outline'
          onClick={() => setIsSidebarOpen((prevState) => !prevState)}
        >
          <img
            src={theme === "dark" ? HamburgerLight : HamburgerDark}
            alt=''
            width={20}
          />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className='flex justify-around items-center mt-[2rem] ml-[2rem]'>
          {user.isLoggedIn ? (
            <User
              name={user.userName || "User"}
              description={
                user.Permissions.includes("admin") ? "Admin" : "CoreNex User"
              }
              avatarProps={{
                src: `${user.avatarProps}`,
                size: "lg",
              }}
            />
          ) : (
            <div className="flex  justify-center items-center gap-[1rem]">
              <LoginWithEmail />
              <ModeToggle />
            </div>
          )}
        </div>

        <div className='flex justify-center items-center '>
          <SideBar fheight={false} marginb={true} fwidth={true} />
        </div>
        {/* <div>
          <Btn Text='Log Out' color='danger' />
        </div> */}
        <SheetFooter>
          <SheetClose asChild>
            <div className='flex justify-between items-center'>
              <Button type='submit' onClick={() => setIsSidebarOpen(false)}>
                Close
              </Button>
              {user.isLoggedIn ? (
                <Btn color='danger' Text='Logout' onClick={handleLogout} />
              ) : null}
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
