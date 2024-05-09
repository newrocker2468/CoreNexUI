import AnimatedLoading from "@/components/AnimatedLoading";
import UserContext from "@/components/UserContext";
import { useContext, useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import { Tabs, Tab, Card, CardBody, User } from "@nextui-org/react";
import axios from "axios";
import CssElement from "@/components/CssElement";

import { v4 as uuidv4 } from "uuid";
interface MyObject {
  css: string;
  html: string;
  id: string;
  user: {
    Permissions: [];
    email: string;
    google: {
      image: string;
    };
    github: {
      image: string;
    };
  };
  isSelected: boolean;
  approvalStatus:string;
}

const Profile = () => {
  const [approvedposts, setapprovedposts] = useState<MyObject[]>([]);
    const [inreviewposts, setinreviewposts] = useState<MyObject[]>([]);
  const { user } = useContext(UserContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 800
  );
  function printUntilAt(s: string) {
    let i = 0;
    const arr = [];
    while (i < s.length && s[i] !== "@") {
      arr.push(s[i]);
      i++;
    }
    return arr.join("");
  }
// useEffect(()=>{
//   try{
//     axios.get("http://localhost:3000/user/getposts",{
//  withCredentials:true
 
//   },
//   )
//   .then((res)=>{
//     console.log(res.data);
//   })
// }
// catch(err){
//     console.log(err);
//   }

// }

// ,[])

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
useEffect(()=>{
  try{
    axios.get(`${import.meta.env.VITE_BASE_URL}/getuserdata`,{
 withCredentials:true
 
  },
  )
  .then((res)=>{
    console.log(res.data.user);
  setapprovedposts(res.data.user.cssElements);
  setinreviewposts(res.data.user.cssElementsInReview);
  })
}
catch(err){
    console.log(err);
  }
},[])

useEffect(() => {
  console.log(setapprovedposts);
}, [approvedposts]);
  const emailname = printUntilAt(user.email);
  // console.log(user);
  
   return (
     <>
       <div className='flex'>
         {isSidebarVisible && (
           <div className='flex-shrink-0 overflow-auto h-screen'>
             <SideBar />
           </div>
         )}
         <div className='flex flex-col w-[70%] p-5 '>
           <div className='flex justify-flex-start  '>
             <AnimatedLoading
               img={`${user.highres_img}`}
               width={250}
               height={200}
             />
             <div className='ml-5'>
               <p>{user.userName}</p>
               <p>{emailname}</p>
               <p>{user.bio}</p>
             </div>
           </div>
           <section>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
             qui obcaecati unde quas dicta quisquam, sint quod quia minima error
             eligendi molestias voluptatum cumque est recusandae reiciendis modi
             illum soluta.
           </section>
           <div className='flex w-full flex-col m-5'>
             <Tabs aria-label='Options' variant='bordered'>
               <Tab key='Posts' title='Posts'>
                 <Card>
                   <CardBody>
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                       {approvedposts
                         .filter((pair) => pair.approvalStatus === "approved")
                         .map((pair) => (
                           <div className='m-3' key={uuidv4()}>
                             <CssElement htmlcssPairs={pair} key={uuidv4()} />
                             {pair.user && pair.user.email ? (
                               <div key={uuidv4()} className='font-bold m-3'>
                                 <User
                                   name={`By ${pair.user.email}`}
                                   avatarProps={{
                                     src: `${
                                       pair.user.github.image ||
                                       pair.user.google.image ||
                                       `https://avatars.dicebear.com/api/avataaars/${pair.user.email}.svg`
                                     }`,
                                   }}
                                 />
                               </div>
                             ) : (
                               "Deleted User"
                             )}
                           </div>
                         ))}
                     </div>
                   </CardBody>
                 </Card>
               </Tab>
               <Tab key='InReview' title='InReview'>
                 <Card>
                   <CardBody>
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                       {inreviewposts
                         .filter((pair) => pair.approvalStatus === "inReview")
                         .map((pair) => (
                           <div className='m-3' key={uuidv4()}>
                             <CssElement htmlcssPairs={pair} key={uuidv4()} />
                             {pair.user && pair.user.email ? (
                               <div key={uuidv4()} className='font-bold m-3'>
                                 <User
                                   name={`By ${pair.user.email}`}
                                   avatarProps={{
                                     src: `${
                                       pair.user.github.image ||
                                       pair.user.google.image ||
                                       `https://avatars.dicebear.com/api/avataaars/${pair.user.email}.svg`
                                     }`,
                                   }}
                                 />
                               </div>
                             ) : (
                               "Deleted User"
                             )}
                           </div>
                         ))}
                     </div>
                   </CardBody>
                 </Card>
               </Tab>
             </Tabs>
           </div>
         </div>
       </div>
     </>
   );
  }

export default Profile;