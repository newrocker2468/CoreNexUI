import Csscard from "../components/Csschallengecard";
import { useEffect } from "react";
import CreatechallengesModal from "@/components/CreatechallengesModal";
import { useState } from "react";
import Csschallengesdata from "@/middlewares/Seeder";
import { Link } from "react-router-dom";
import axios from "axios"

import { toast } from "sonner";

interface user{
  Permissions:string[]
  email:string,
  

}
const Csschallenges = () => {
  const [Cssdata, setCssdata] = useState(Csschallengesdata);
  const[user,setUser]=useState<user>();
const [showToast, setShowToast] = useState(false);
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const showToast_Delete = urlParams.get("Delete");
  if (showToast_Delete) {
    toast.success("Css Challenge Deleted Successfully !", {
      duration: 2500,
      position: "top-center",
      action: {
        label: "X",
        onClick: () => console.log("Action"),
      },
    });
    // Remove the showToast query parameter after showing the toast
    urlParams.delete("showToast");
    window.history.replaceState({}, "", `${window.location.pathname}`);
  }
  if (showToast) {
    toast.success("Css Challenge Created Successfully !", {
      duration: 2500,
      position: "top-center",
      action: {
        label: "X",
        onClick: () => console.log("Action"),
      },
    });
    setShowToast(false);

  }
}, [showToast]);


 useEffect(() => {

    fetchCsschallengesdata();
  }, []);

  const fetchCsschallengesdata = async () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/csschallenges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCssdata(data);
      })
      .catch((error) => console.error("Error:", error));
  }; 



  const fetchuserdata = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/getuserdata/csschallenges`, {
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
        });
    } catch (error) {
      console.log(error);
    }
  };
 useEffect(() => {
 fetchuserdata()
 },[])
  return (
    <>
      <section className='flex align-center justify-center'>
        <div className='grid items-center '>
          {user?.Permissions.includes("admin") ||
          user?.Permissions.includes("createchallenges") ? (
            <CreatechallengesModal Cssdata={Cssdata} Setdata={setCssdata} />
          ) : (
            ""
          )}
        </div>
      </section>
      <div className="flex flex-col justify-center items-center ">
      {Cssdata && Cssdata.length > 0 ? (Cssdata?.map((data, index) => {
          return (
            <div className='md:mt-[1rem] mt-[5rem]' key={index}>
              <Link
                to={`${data?.id}`}
                key={index}
                className='text-inherit no-underline md:m-4 mx-[4rem]   md:h-[50vh] md:w-[78vw]   relative  cursor-pointer flex  justify-between h-auto w-auto md:flex-row flex-col-reverse '
              >
                <Csscard
                  key={index}
                  id={data?.id}
                  title={data?.title}
                  description={data?.description}
                  sdesc={data?.sdesc}
                  img={data?.img}
                  status={data?.status}
                  sdate={data?.date?.from}
                  edate={data?.date?.to}
                  numSubmissions={data?.submissions?.length}
                />
              </Link>
            </div>
          );
        })) : ("No Challenges Available To Display")}
      </div>
    </>
  );
};

export default Csschallenges;
