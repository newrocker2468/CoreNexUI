import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import CssElement from "@/components/CssElement";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, Link, User } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { toast } from "sonner";
export default function AdminPanel() {
const [ElementsforApproval, setElementsforApproval] = useState<any[]>([]);
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
          "http://localhost:3000/CssElements/getallforApproval",
        );
        setElementsforApproval(res.data);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }

}

const deleteElement = async (id: string,email:string) => {
    console.log(email);
    console.log(id);
    try {
        const res = await axios.post(
          `http://localhost:3000/Cssinapproval/delete/${id}`,
            {email :email}
        );
        console.log(res.data);
        setElementsforApproval(res.data.element);
        toast(res.data.message,{
            position:"top-center",
        })
    } catch (error) {
        console.log(error);
}

}
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

              <div className='grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:min-w-[294px] items-stretch content-stretch w-full mb-48'>
                {ElementsforApproval.map(
                  (pair: {
                    id: string;
                    html: string;
                    css: string;
                    user: object;
                  }) => (
                    <div className='m-3' key={uuidv4()}>
                      <div key={uuidv4()} className='font-bold m-3'>
                        {/* By {(pair.user as { email: string }).email} */}
                        <User
                          name={`By ${pair.user.email}`}
                          // description='Product Designer'
                          avatarProps={{
                            src: `${
                              pair.user.github.image || pair.user.google.image
                            }`,
                          }}
                        />
                      </div>
                      <CssElement htmlcssPairs={pair} key={uuidv4()} />
                      <div className='flex m-3 justify-around'>
                        <Button
                          onClick={() => deleteElement(pair._id,pair.user.email)}
                          color='danger'
                          variant='solid'
                        >
                          X Reject
                        </Button>
                        <Button color='success' variant='solid'>
                          Approve
                        </Button>
                      </div>
                      {/* <div key={uuidv4()}>{user.google.image}</div> */}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}