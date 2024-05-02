import { Link, useParams } from "react-router-dom";
import Csschallengecard from "./Csschallengecard";
import uiverse from "@/images/uiversecss2.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditChallengeModal from "./EditChallengeModal";
import Btn from "./Btn";
import { v4 as uuidv4 } from "uuid";
import EventCard from "./EventCard";
import EditEventModal from "./EditEventModal";
import "../Styles/EventDescription.css"
import EventDeleteModal from "./EventDeleteModal";

interface Challenge1 {
  id: string ;
  eventName: string ;
  sdesc: string ;
  description: string;
  img: string ;
  status: string ;
  date: {
    from: string;
    to: string ;
  };
}

const EventDescription = () => {                  //changed
  const params = useParams();
  const [Cssdata, setCssdata] = useState<Challenge1 | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  const fetchuserdata = async () => {
    const response = await axios.get(
      "http://localhost:3000/getuserdata",     //changed
      {
        withCredentials: true,
      }
    );
    console.log(response.data.user);
    setUser(() => response.data.user);
    setIsLoading(false); // Add this line
  };

  useEffect(() => {
    fetchuserdata();
  }, []);

  useEffect(() => {
    const id = params.id;
    axios
      .post("http://localhost:3000/eventsget", {       //changed
        id: id,
      }
      )
      .then((res) => {
        setCssdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    // Add this condition
    return <div>Loading...</div>; // Replace this with your actual loading indicator
  }

  if (!Cssdata) {
    return (
      <>
        <p>Event not found</p>
      </>
    );
  }

  return (
    <>
      {user?.Permissions.includes("admin") ||
      user?.Permissions.includes("editchallenges") ? (
        <div className='flex justify-center align-center m-5'>
          <EditEventModal Cssdata={Cssdata} setCssdata={setCssdata} />
        </div>
      ) : (
        ""
      )}
      {user?.Permissions.includes("admin") ||
      user?.Permissions.includes("deleteevent") ? (
        <div className='flex justify-center align-center m-5'>
          <EventDeleteModal id={Cssdata.id} />
        </div>
      ) : (
        ""
      )}
      
          <h1>{Cssdata.eventName}</h1>
     <img src={Cssdata.img} alt="" />
       
    </>
  );
};

export default EventDescription;
