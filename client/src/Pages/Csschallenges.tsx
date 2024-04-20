import Csscard from "../components/Csschallengecard";
import { useEffect } from "react";
import CreatechallengesModal from "@/components/CreatechallengesModal";
import { useState } from "react";
import Csschallengesdata from "@/middlewares/Seeder";
import { Link } from "react-router-dom";


import { toast } from "sonner";
import { set } from "date-fns";

const Csschallenges = () => {
  const [Cssdata, setCssdata] = useState(Csschallengesdata);

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
    // Remove the showToast query parameter after showing the toast
    // urlParams.delete("Create");
    // window.history.replaceState({}, "", `${window.location.pathname}`);
  }
}, [showToast]);


  useEffect(() => {

    fetchCsschallengesdata();
  }, []);

  const fetchCsschallengesdata = async () => {
    fetch(`http://localhost:3000/csschallenges`, {
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

  // console.log(Cssdata);
  return (
    <>
      <section className='flex align-center justify-center'>
        <div className='grid items-center w-[20dvw]'>
          <CreatechallengesModal
            Cssdata={Cssdata}
            Setdata={setCssdata}
            showToast={showToast}
            setShowToast={setShowToast}
          />
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
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Csschallenges;
