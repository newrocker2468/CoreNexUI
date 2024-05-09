import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import EditEventModal from "./EditEventModal";
import "@/Styles/CssChallengeDescription.css"
import EventDeleteModal from "./EventDeleteModal";
import {Image} from "@nextui-org/react";



interface Challenge1 {
  id: string | undefined;
  eventName: string | undefined;
  sdesc: string | undefined;
  description: string | undefined;
  img: string | undefined;
  status: string | undefined;
  date: {
    from: string | undefined;
    to: string | undefined;
  };
}

const EventDescription = () => {                  //changed
  const params = useParams();
  const [Cssdata, setCssdata] = useState<Challenge1 | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  const fetchuserdata = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/getuserdata`, //changed
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
      .post(`${import.meta.env.VITE_BASE_URL}/eventsget`, {
        //changed
        id: id,
      })
      .then((res) => {
        setCssdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
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
      user?.Permissions.includes("editevents") ? (
        <div className='flex justify-center align-center m-5'>
          <EditEventModal Cssdata={Cssdata} setCssdata={setCssdata} />
        </div>
      ) : (
        ""
      )}
      {user?.Permissions.includes("admin") ||
      user?.Permissions.includes("deleteevents") ? (
        <div className='flex justify-center align-center m-5'>
          <EventDeleteModal id={Cssdata.id} />
        </div>
      ) : (
        ""
      )}

      
          <h1>{Cssdata.eventName}</h1>
          <p>{Cssdata.description}</p>
     <img src={Cssdata.img} alt="" />


       
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
