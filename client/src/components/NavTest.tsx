"use client";

import * as React from "react";
import { Link as NextUILink } from "@nextui-org/react";
import Link from "@/components/Link";
import { ModeToggle } from "@/components/mode-toggle.jsx";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo.tsx";
import { useTheme } from "./theme-provider";
import { useContext, useEffect, useState } from "react";
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
import UserContext from "./UserContext";
import { Link as RouterLink} from "react-router-dom";

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
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, setUser } = useContext(UserContext);

  const getUserData = async () => {
    try {
      const response = await axios("http://localhost:3000/login/sucess", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
    const img = new Image();
    img.src = response.data.user.google.image;

//NOTE - For High resolution images
let highres_img = response.data.user.google.image;
      if (response.data.user.google.image.includes("s96-c")) {
        highres_img =response.data.user.google.image.replace("s96-c", "s500-c");
      } else if (response.data.user.google.image.includes("sz=50")) {
        highres_img = response.data.user.google.image.replace(
          "sz=50",
          "sz=240"
        );
      }
console.log(response.data)

if(response.data.user.lastLoggedInWith =="google"){
          setUser((prevState) => ({
            ...prevState,
            userName: response.data.user.google.displayName,
            avatarProps: img.src,
            highres_img: highres_img,
            email: response.data.user.email,
            isLoggedIn: true,
            bio: response.data.user.google.bio,
          }));

}
else{
  img.src = response.data.user.github.image;
  highres_img = response.data.user.github.image;
        setUser((prevState) => ({
          ...prevState,
          userName: response.data.user.github.displayName,
          avatarProps: img.src,
          highres_img: highres_img,
          email: response.data.user.email,
          isLoggedIn: true,
          bio: response.data.user.github.bio,
        }));
}



      //NOTE - not sure whether this makes a diiference or not
   
      // img.src = response.data.user.image;

      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      // console.log(response);
      localStorage.removeItem("token");
      setUser((prevState) => ({
        ...prevState,
        userName: "",
        avatarProps:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
          highres_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
        isLoggedIn: false,
        Loginwithgoogle: false,
        Loginwithgithub: false,
      }))

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
                    <ListItem to='/home' title='Introduction'>
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
             
             
                    {/* <li data-radix-collection-item>
                      <RouterLink
                        to={"/home"}
                        className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                        data-radix-collection-item='true'
                      >
                        <div className='text-sm font-bold leading-none'>
                          Home
                        </div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                          Welcome to our platform. Explore a wide range of
                          features and services tailored for you.
                        </p>
                      </RouterLink>
                    </li> */}

                    {!user.isLoggedIn ? (
                      <ListItem to='/login' title='Login'>
                        Secure user authentication. Log in to access your
                        personalized settings and content.
                      </ListItem>
                    ) : (
                      <ListItem to='/profile' title='Profile'>
                        Manage your profile settings and preferences. View and
                        edit your personal information.
                      </ListItem>
                    )}
                    {!user.isLoggedIn ? (
                      <ListItem to='/signup' title='Sign Up'>
                        Easy and quick user registration. Sign up to join our
                        community and start exploring.
                      </ListItem>
                    ) : (
                      ""
                    )}
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
                        to={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>

                  {/* className='no-underline text-current text-sm leading-none' */}
                  {/* className='line-clamp-2 text-sm leading-snug text-muted-foreground' */}
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <RouterLink
                  to='/docs'
                  className={`${navigationMenuTriggerStyle()}  no-underline text-current text-sm leading-none`}
                >
                  <span className='font-bold '>Documentation</span>
                </RouterLink>
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
          {user.isLoggedIn ? (
            <div className='flex justify-center align-center pt-1.5'>
              <Userdata
                name={user.userName}
                image={user.avatarProps}
                description={user.description}
                handleLogout={handleLogout}
              />
              {/* //REVIEW - For testing purpose only  */}
              {/* <img src={`${image}`} alt='user image' /> */}
            </div>
          ) : (
            <div className='right-[4rem] top-[1.1rem]'>
              <NextUILink href='/login' className='btn'>
                <LoginWithEmail />
              </NextUILink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof RouterLink>,
  React.ComponentPropsWithoutRef<typeof RouterLink>
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <RouterLink
          to={to}
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
        </RouterLink>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

