import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

export function NavBarShortScreen() {
  const { user } = useContext(UserContext);
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    console.log(isSidebarOpen);
  }, [isSidebarOpen]);

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
          <ModeToggle />
        </div>

        <div className='flex justify-center items-center '>
          <SideBar fheight={false} marginb={true} fwidth={true} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' onClick={() => setIsSidebarOpen(false)}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
