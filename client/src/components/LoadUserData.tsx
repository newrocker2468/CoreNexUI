import axios from "axios";
import { FC, useEffect, useState } from "react";
import {  Image } from "@nextui-org/react";
import CssElement from "./CssElement";
type User = {
  email: string;
  google: {
    image: string;
    displayName: string;
  };
  Permissions:[]
  cssElements: [];
  github: {
    image: string;
    displayName: string;
  };
};
interface LoadUserDataProps {
  email: string;
}
const LoadUserData: FC<LoadUserDataProps> = ({ email }) => {
  const [User, SetUser] = useState <User>();
  console.log(email);
const[highresimg,sethighresimg] = useState()
   useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/getuserdata/${email}`, {
          withCredentials: true,
        })
        .then((res) => {
          SetUser(res.data.user);
          console.log(res.data);
              let highres_img = res.data.user.google.image;
              if (res.data.user.google.image.includes("s96-c")) {
                highres_img = res.data.user.google.image.replace(
                  "s96-c",
                  "s500-c"
                );
                sethighresimg(highres_img);
              } else if (res.data.user.google.image.includes("sz=50")) {
                highres_img = res.data.user.google.image.replace(
                  "sz=50",
                  "sz=240"
                );
                sethighresimg(highres_img);
              }
        });
    } catch (err) {
      console.log(err);
    }
  }, [email]);
return (
  <>
    {" "}
    <div className='flex justify-between align-center m-5'>
      <div className='flex justify-around w-full'>
        {User && (
          <>
            <div className='m-5'>
              <h1>Google Profile</h1>
              <Image
                alt='Woman listing to music'
                className='object-cover m-5'
                height={200}
                src={
                  highresimg ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png"
                }
                width={200}
              />{" "}
            </div>

            <div className='m-5'>
              <h1>Github Profile</h1>
              <Image
                alt='Woman listing to music'
                className='object-cover m-5'
                height={200}
                src={`${
                  User.github.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png"
                }`}
                width={200}
              />{" "}
            </div>
          </>
        )}
      </div>
    </div>
    {User && <div className='text-center'>{User.email}</div>}
    {User && (
      <div className='text-center'>No of Posts : {User.cssElements.length}</div>
    )}
    {User &&
      User.Permissions.map((element) => (
        <div className='m-5'>{element}</div>
      ))}
    <div className='grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:min-w-[294px] items-stretch content-stretch w-full mb-48'>
      {User &&
        User.cssElements.map((element, index) => (
          <div className='m-5'>
            <CssElement key={index} htmlcssPairs={element} />
          </div>
        ))}
    </div>
  </>
);
};

export default LoadUserData;
