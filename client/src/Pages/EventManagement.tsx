import Csscard from "../components/Csschallengecard";
import { useEffect } from "react";
import CreatechallengesModal from "@/components/CreatechallengesModal";
import { useState } from "react";
import Csschallengesdata from "@/middlewares/Seeder";
import { Link } from "react-router-dom";
import axios from "axios"
import EventCard from "@/components/EventCard";
import { toast } from "sonner";
import { set } from "date-fns";
import EventData from "@/middlewares/EventSeed";
import CreateEventModal from "@/components/CreateEventModal"
interface user{
  Permissions:string[]
  email:string,

}
const EventManagement = () => {
  const [Cssdata, setCssdata] = useState(EventData);
  const[user,setUser]=useState<user>();
const [showToast, setShowToast] = useState(false);
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const showToast_Delete = urlParams.get("Delete");
  console.log(showToast);
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
    console.log(Cssdata);
  }, [Cssdata]);
  
  useEffect(() => {

    fetchCsschallengesdata();
  }, []);

  const fetchCsschallengesdata = async () => {
    fetch(`http://localhost:3000/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("<datataa></datataa>")
        console.log(data)
        setCssdata(data);
        console.log(Cssdata)
      })
      .catch((error) => console.error("Error:", error));
  };



  const fetchuserdata = async () => {
    try {
      axios
        .get("http://localhost:3000/getuserdata/csschallenges",{
          withCredentials:true
        })
        .then((response) => {
          console.log(response.data.user);
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
        <div className='grid items-center w-[20dvw]'>
          {user?.Permissions.includes("admin") ||
          user?.Permissions.includes("createchallenges") ? (
            <CreateEventModal
              Cssdata={Cssdata}
              Setdata={setCssdata}
    
            />
          ) : (
            ""
          )}
        </div>
      </section>
      {Cssdata?.map((data, index) => {
        return (
          <div className='mt-[3rem] mb-[3rem]' key={index}>
            <Link
              to={`${data?.id}`}
              key={index}
              className='text-inherit no-underline'
            >
              <EventCard
                key={index}
                id={data?.id}
                title={data?.eventName}
                description={data?.description}
                sdesc={data?.sdesc}
                img={data?.img}
                status={data?.status}
                sdate={data?.date?.from}
                edate={data?.date?.to}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default EventManagement;
