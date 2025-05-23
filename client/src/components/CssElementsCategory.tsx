import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CssElement from "./CssElement";
import { v4 as uuidv4 } from "uuid";
import { Button, Link } from "@nextui-org/react";
import SideBar from "./SideBar";
import { toast } from "sonner";
// Route definition

// CategoryPage component
const CssElementsCategory = () => {
  const { category } = useParams();
const [data, setData] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 1200
  );


  const handleResize = useCallback(() => {
    setIsSidebarVisible(window.innerWidth > 1200);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/Csselements/${category}`)
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log(fetchedData);
        if (fetchedData.error) {
          toast("error", {
            position: "top-center",
          });
        }
        setData(fetchedData);
        if (fetchedData.length === 0) {
          toast.error("No Css Elements Available to display", {
            position: "top-center",
          });
        }
      })
      .catch((error) => console.error(error));
  }, [category]);
  const id = uuidv4();

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
            <div className='flex justify-center'>
              <Button
                href={`/editor/create/${id}`}
                as={Link}
                color='primary'
                variant='solid'
              >
                Create CssElement
              </Button>
            </div>
            <div className='grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 xl:grid-cols-3  2xl:min-w-[294px] items-stretch content-stretch w-full mb-48'>
              {data.map((element) => (
                <div className='m-3' key={uuidv4()}>
                  <CssElement key={uuidv4()} htmlcssPairs={element} />
                  {/* {element.user ? (
                    <User
                      name={`By ${element.user.email}`}
                      avatarProps={{
                        src:
                          element.user.lastLoggedInWith === "github"
                            ? element.user.github.image
                            : element.user.lastLoggedInWith === "google"
                            ? element.user.google.image
                            : `https://avatars.dicebear.com/api/avataaars/${element.user.email}.svg`,
                      }}
                    />
                  ) : (
                    ""
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CssElementsCategory;
