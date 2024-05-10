/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { Link as NextUILink } from "@nextui-org/react";
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
import { Link, useNavigate } from "react-router-dom";
import Userdata from "./Userdata";
import UserContext from "./UserContext";
import { Link as RouterLink } from "react-router-dom";
import Cookies from "js-cookie";
import { NavBarShortScreen } from "./NavBarShortScreen";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All Elements",
    href: "/Csselements",
    description:
      "Explore a comprehensive collection of diverse and interactive CSS elements.",
  },
  {
    title: "Buttons",
    href: "/Csselements/button",
    description:
      "Discover buttons with various styles and animations to make your user interactions more engaging.",
  },
  {
    title: "CheckBoxes",
    href: "/Csselements/checkbox",
    description:
      "Check out checkboxes that provide users with intuitive selection options.",
  },
  {
    title: "Toggle Switches",
    href: "/Csselements/switches",
    description:
      "Switch between options smoothly with our aesthetically pleasing toggle switches.",
  },
  {
    title: "Cards",
    href: "/Csselements/cards",
    description:
      "Browse through card designs that elegantly present grouped information.",
  },
  {
    title: "Loaders",
    href: "/Csselements/loaders",
    description:
      "Keep users engaged during loading times with our captivating loader designs.",
  },
  {
    title: "Input Fields",
    href: "/Csselements/Input",
    description:
      "Enhance user input with our collection of user-friendly and visually appealing input fields.",
  },
  {
    title: "Radio Buttons",
    href: "/Csselements/radiobuttons",
    description:
      "Explore radio buttons that offer users clear and concise multiple-choice options.",
  },
  {
    title: "Forms",
    href: "/Csselements/Forms",
    description:
      "Create effective user interactions with our well-designed and easy-to-use forms.",
  },
  {
    title: "Patterns",
    href: "/Csselements/patterns",
    description:
      "Add visual interest to your designs with our collection of unique and eye-catching patterns.",
  },
  {
    title: "ToolTips",
    href: "/Csselements/tooltips",
    description:
      "Provide helpful hints and additional information with our informative and easy-to-integrate tooltips.",
  },
];

export default function NavTest() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [, setToken] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_BASE_URL}/validate-token`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        const user = await response.data.user;
        if (user) {
          const platform = user.lastLoggedInWith;
          const profile = user[platform];
          let highres_img = profile.image;
          if (profile.image.includes("s96-c")) {
            highres_img = profile.image.replace("s96-c", "s500-c");
          } else if (profile.image.includes("sz=50")) {
            highres_img = profile.image.replace("sz=50", "sz=240");
          }

          setUser((prevState) => ({
            ...prevState,
            userName: profile.displayName,
            avatarProps: profile.image,
            highres_img: highres_img,
            isLoggedIn: true,
            email: user.email!,
            bio: profile.bio,
            Permissions: user.Permissions,
          }));
        }
      } catch (error) {
        console.log(error);
        const response = (error as any).response;

        // If the error is due to an expired token, refresh the token
        axios.defaults.withCredentials = true;
        if (error instanceof Error) {
          if (response.status === 401) {
            try {
              // Request a new token
              await axios.post(
                `${import.meta.env.VITE_BASE_URL}/refresh_token`
              ).catch(() => {
                console.log("ERROR FETCHING API REFRSH TOKEN");
              })

              // Retry the original request
              const retryRes = await axios(
                `${import.meta.env.VITE_BASE_URL}/validate-token`
              ).catch(() => {
                console.log("ERROR FETCHING API REFRSH TOKEN 2");
              })

              // @ts-expect-error -  DATA IS UNDEGINED
              const user = await retryRes.data.user;
              if (user) {
                const platform = user.lastLoggedInWith;
                const profile = user[platform];
                let highres_img = profile.image;
                if (profile.image.includes("s96-c")) {
                  highres_img = profile.image.replace("s96-c", "s500-c");
                } else if (profile.image.includes("sz=50")) {
                  highres_img = profile.image.replace("sz=50", "sz=240");
                }
                console.log("dddddddddddddddddddddddddddddddddd");
                console.log(user);
                setUser((prevState) => ({
                  ...prevState,
                  userName: profile.displayName,
                  avatarProps: profile.image,
                  highres_img: highres_img,
                  isLoggedIn: true,
                  email: user.email!,
                  bio: profile.bio,
                  Permissions: user.Permissions,
                }));
              }
            } catch (refreshError) {
              console.log(refreshError);
            }
          }
        }
      }
    };

    // Call the function when the component mounts
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
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
      setToken(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={`flex align-center justify-between  sm:justify-around mb-[1.3em] mt-[0.9rem] text-center md:items-center`}
      >
        <div className='md:flex align-center  w-[5rem] justify-start ml-[1.5rem]'>
          <Logo
            fill={theme === "dark" ? "#FFFFFF" : "#000000"}
            width='2.6rem'
          />
        </div>
        {/* //NOTE - The placeHolder is visible if zindex is not applied  */}
        <div className='flex align-center justify-center '>
          <NavigationMenu className='z-40'>
            <NavigationMenuList>
              <NavigationMenuItem className='sm:flex hidden'>
                <NavigationMenuTrigger className='font-bold'>
                  Getting started
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[0.75fr_1.2fr] z-40'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <Link
                          className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          to='/'
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
                        </Link>
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
                    <ListItem to='/Csschallenges' title='Css Challenges'>
                      Dive into CSS challenges to test and enhance your styling
                      skills. Perfect for learning new techniques and getting
                      creative with CSS.
                    </ListItem>

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
                <NavigationMenuTrigger className='font-bold sm:flex hidden'>
                  Css Elements
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
              <NavigationMenuItem className='sm:flex hidden'>
                <RouterLink
                  to='/event'
                  className={`${navigationMenuTriggerStyle()}  no-underline text-current text-sm leading-none`}
                >
                  <span className='font-bold '>Events</span>
                </RouterLink>
              </NavigationMenuItem>
              <div
                className='md:flex justify-center align-center hidden'
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
            <div className='flex justify-center align-center pt-1.5 md:flex hidden'>
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
            <div className='right-[4rem] top-[1.1rem] sm:flex hidden'>
              <NextUILink href='/login' className='btn'>
                <LoginWithEmail />
              </NextUILink>
            </div>
          )}
          <div className='sm:hidden flex mr-5'>
            <NavBarShortScreen />
          </div>
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof RouterLink>,
  React.ComponentPropsWithoutRef<typeof RouterLink>
>(({ className, title, children, to, ...props }, _ref) => {
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
