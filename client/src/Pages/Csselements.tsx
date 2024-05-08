import { User } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { Link as nLink, Button } from "@nextui-org/react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CssElement from "@/components/CssElement";
import SideBar from "@/components/SideBar";

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
}

export default function Csselements() {
  const [htmlCssPairs, setHtmlCssPairs] = useState<MyObject[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 1200
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleResize = useCallback(() => {
    setIsSidebarVisible(window.innerWidth > 1200);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allcsselements")
      .then((response) => {
        const pairs = response.data.map((item: any) => ({
          html: item.html,
          css: item.css,
          id: item._id,
          user: item.user,
          isSelected: item.isSelected,
        }));
        setHtmlCssPairs(pairs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const id = uuidv4();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex'>
      {isSidebarVisible && (
        <div className='flex-shrink-0 overflow-auto h-screen'>
          <SideBar />
        </div>
      )}
      <div className='flex-grow'>
        <div className='grid place-items-center'>

            <Button
              href={`/editor/create/${id}`}
              as={nLink}
              color='primary'
              variant='solid'
            >
              Create CssElement
            </Button>
        
          <div className='grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:min-w-[294px] items-stretch content-stretch w-full mb-48'>
            {htmlCssPairs.map((pair) => (
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
        </div>
      </div>
    </div>
  );
}
