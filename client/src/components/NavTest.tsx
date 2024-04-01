"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle.jsx";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo.tsx";
import { useTheme } from "./theme-provider";
import { useEffect,useState } from "react";

import LoginWithEmail from "@/components/LoginWithEmail";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Userdata from "./Userdata";


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavTest() {
  const { theme } = useTheme();
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState(
    ""
  );
  const [userName, setUserName] = useState("");
 const navigate = useNavigate();
const [userdata, setUserData] = useState({});
const [description, setDescription] = useState("CoreNex UI User");
const [avatarProps, setAvatarProps] = useState(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png"
);
const getUserData = async () => {

  try{
    const response = await axios("http://localhost:3000/login/sucess", {
      withCredentials: true,
    });
    
    console.log(userdata);
    setUserData(response.data.user)
    setIsLoggedIn(true);
  setUserName(response.data.user.displayName);
setDescription(response.data.user.description)


  setImage(response.data.user.image);
  setAvatarProps(response.data.user.image);

console.log(response.data.user.image)
console.log(image)
  }
  catch(err){
console.log(err)
  }

}
useEffect(() => {
  getUserData();
}, []);


const handleLogout = async () => {
  try {
    const response = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
    });
    console.log(response);
    setUserData({});
    setIsLoggedIn(false);
    navigate("/login");
  } catch (err) {
    console.error(err);
  }
};








  return (
    <>
      <div
        className={`flex align-center justify-around mb-[1.3em] mt-[0.9rem] text-center`}
      >
        {/* <img
          src='https://lh3.googleusercontent.com/a/ACg8ocKeLTcdHWK3LoEVoB6TVjUK-NSzQOG0bEcuO5z51X88=s96-c'
          alt=''
          className='w-[1.8rem]'
        /> */}
        <div className='flex align-center justify-around w-[5rem]'>
          <Logo
            fill={theme === "dark" ? "#FFFFFF" : "#000000"}
            width='2.6rem'
          />
        </div>
        {/* //NOTE - The placeHolder is visible if zindex is not applied  */}
        <div className='flex align-center justify-center '>
          <NavigationMenu className='z-40'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='font-bold'>
                  Getting started
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[0.75fr_1.2fr] z-40'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <a
                          className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          href='/'
                        >
                          <div className='flex justify-center align-center'>
                            <Logo
                              fill={theme === "dark" ? "#FFFFFF" : "#000000"}
                              width='2.8rem'
                            />
                            {/* <img src={Logo} alt='' className='h-6 w-6' /> */}
                          </div>

                          <div className='mb-2 mt-4 text-lg  font-sans'>
                            CoreNex UI
                          </div>
                          <p className='text-sm leading-tight text-muted-foreground '>
                            Beautifully designed components that you can copy
                            and paste into your apps. Accessible. Customizable.
                            Open Source.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href='/home' title='Introduction'>
                      Welcome to our platform. Explore a wide range of features
                      and services tailored for you.
                    </ListItem>
                    <ListItem href='/login' title='Login'>
                      Secure user authentication. Log in to access your
                      personalized settings and content.
                    </ListItem>
                    <ListItem href='/signup' title='Sign Up'>
                      Easy and quick user registration. Sign up to join our
                      community and start exploring.
                    </ListItem>
                    <ListItem href='/signup' title='Sign Up'>
                      Easy and quick user registration. Sign up to join our
                      community and start exploring.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='font-bold'>
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to='/home' className={navigationMenuTriggerStyle()}>
                  <span className='font-bold'>Documentation</span>
                </Link>
              </NavigationMenuItem>
              <div
                className='flex justify-center align-center'
                style={{ marginLeft: "2rem" }}
              >
                <ModeToggle />
          
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div>
          {/* <NextuiBtn name={userName} avatarProps={} description ={description}/> */}
          {isloggedin ? (
            <div className='flex justify-center align-center pt-1.5'>
              <Userdata
                name={userName}
                image={avatarProps}
                description={description}
                handleLogout={handleLogout}
              />
              {/* <App/> */}
            </div>
          ) : (
            <div className='fixed right-[4rem] top-[1.1rem]'>
              <Link to='/login' className='btn'>
                <LoginWithEmail />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}



const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className='text-sm font-bold leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>

    </li>
  );
});
ListItem.displayName = "ListItem";
