import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import CssElement from "@/components/CssElement";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, User } from "@nextui-org/react";
import { toast } from "sonner";
interface MyObject {
  _id: string;
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
    lastLoggedInWith:string;
  };
  elementtype: string;
  isSelected: boolean;
}

export default function PostAdpprovalReject() {
  const [ElementsforApproval, setElementsforApproval] = useState<MyObject[]>(
    []
  );
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
  const getElementsforApproval = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/CssElements/getallforApproval`,
        { withCredentials: true }
      );
if(res.data.error){
  toast(res.data.message,{
    position:"top-center"
  })
}else{
  console.log(res.data);
        setElementsforApproval(res.data);
        console.log(res.data);
}
    } catch (error) {
      console.log(error);
    }
  };

 const deleteElement = async (id: string, email: string) => {
   console.log(email);
   console.log(id);

   try {
     const res = await axios.post(
       `${import.meta.env.VITE_BASE_URL}/Cssinapproval/delete/${id}`,
       { email: email },
       { withCredentials: true }
     );

     if (res.data.error) {
       toast(res.data.message, {
         position: "top-center",
       });
     } else {
       console.log(res.data);
       setElementsforApproval(res.data.element);
       toast(res.data.message, {
         position: "top-center",
       });
     }
   } catch (error) {
     console.log(error);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response = (error as any).response;


     if (error instanceof Error && response && response === 401) {
       try {
         // Request a new token
         await axios.post(
           `${import.meta.env.VITE_BASE_URL}/refresh_token`,
           {},
           { withCredentials: true }
         );

         // Retry the original request
         const retryRes = await axios.post(
           `${import.meta.env.VITE_BASE_URL}/Cssinapproval/delete/${id}`,
           { email: email },
           { withCredentials: true }
         );

         console.log(retryRes.data);
         setElementsforApproval(retryRes.data.element);
         toast(retryRes.data.message, {
           position: "top-center",
         });
       } catch (refreshError) {
         console.log(refreshError);
       }
     }
   }
 };


  const approveElement = async (id: string, email: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/Cssinapproval/approve/${id}`,
        { email: email },
        { withCredentials: true }
      );
      setElementsforApproval(res.data.elements);
      if (res.data.message) {
        toast.success(res.data.message, {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getElementsforApproval();
  }, []);

  return (
    <>
      <div className='flex'>
        {isSidebarVisible && (
          <div className='flex-shrink-0 overflow-auto h-screen'>
            <SideBar />
          </div>
        )}
        <div className='flex-grow'>
          <div className='grid'>
            {/* <Link
                to={`/editor/create/${id}`}
                className='self-center relative top-[-1rem]'
              >
                Create
              </Link> */}

            <div className='grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 xl:grid-cols-3  2xl:min-w-[294px] items-stretch content-stretch w-full mb-48'>
              {ElementsforApproval && ElementsforApproval.length > 0 ? (
                ElementsforApproval.map((pair) => (
                  <div className='m-3' key={uuidv4()}>
                    <div key={uuidv4()} className='font-bold m-3'>
                      <User
                        name={`By ${
                          pair.user ? pair.user.email : "User Deleted"
                        }`}
                        avatarProps={{
                          src:
                            pair.user.lastLoggedInWith === "github"
                              ? pair.user.github.image
                              : pair.user.lastLoggedInWith === "google"
                              ? pair.user.google.image
                              : `https://avatars.dicebear.com/api/avataaars/${pair.user.email}.svg`,
                        }}
                      />
                    </div>
                    <CssElement htmlcssPairs={pair} key={uuidv4()} />
                    <div className="text-center m-5">Element Type : {pair.elementtype}</div>
                    <div className='flex m-3 justify-around'>
                      <Button
                        onClick={() =>
                          deleteElement(
                            pair._id,
                            pair.user ? pair.user.email : "User Deleted"
                          )
                        }
                        color='danger'
                        variant='solid'
                      >
                        X Reject
                      </Button>
                      <Button
                        color='success'
                        variant='solid'
                        onClick={() => {
                          approveElement(
                            pair._id,
                            pair.user ? pair.user.email : "User Deleted"
                          );
                        }}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No CSS elements to be reviewed</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
