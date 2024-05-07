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
import "@/Styles/CssChallengeDescription.css"
import EventDeleteModal from "./EventDeleteModal";
import {Image} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {Spinner} from "@nextui-org/react";
import { ClassNames } from "@emotion/react";


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

       
    <div className="container">
     <div className="left">
     <Image
     isBlurred
      alt="NextUI hero Image with delay"
      src={Cssdata.img}
    />
    
     </div>
     {/* <div className="keyfeature"> */}
     <div className="right">
     <div className="wrapper">
<div className="circle-1"></div>
<div className="circle-2"></div>
<div className="inner-card">
  <section className="top">
    <span className="u-l">Key Description of the Event {Cssdata.eventName} </span>
  </section>
  <section className="bottom">
    <ul className="users">
      <li className="user">
        <span className="user-name">EVENT NAME</span>
        <span className="user-occupation">{Cssdata.eventName}</span>
      </li>
      <li className="user">
        <span className="user-name">Event Description</span>
        <span className="user-occupation">{Cssdata.description}</span>
      </li>
      <li className="user">
        <span className="user-name">Status</span>
        <span className="user-occupation">{Cssdata.status}</span>
      </li>
      <li className="user">
        <span className="user-name">Date</span>
        <span className="user-occupation">{Cssdata.date.from}-to-{Cssdata.date.to}</span>
      </li>
    </ul>   
  </section>
</div>
</div>
</div>
     

    </div>
     

    </>
  );
};

export default EventDescription;
