/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import Csschallengecard from "./Csschallengecard";
import "@/Styles/CssChallengeDescription.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditChallengeModal from "./EditChallengeModal";
import Btn from "./Btn";
import { toast } from "sonner";
import ChallengesPosts from "./ChallengesPosts";
import Loader from "./Loader";

interface Challenge1 {
  id: string | undefined;
  title: string | undefined;
  sdesc: string | undefined;
  description: string | undefined;
  img: string | undefined;
  status: string | undefined;
  date: {
    from: string | undefined;
    to: string | undefined;
  };
  submissions:[];
}

const CssChallengeDescription = () => {
  const params = useParams();
  const[sortedSubmissions, setSortedSubmissions] = useState([]);
  const [votesno] = useState(0);
  const [Cssdata, setCssdata] = useState<Challenge1 | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const {id} = useParams<{id:string}>();
  

  const fetchuserdata = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/getuserdata/csschallenges`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data.user);
    setUser( response.data.user);
    setIsLoading(false); // Add this line
  };

  useEffect(() => {
    fetchuserdata();
  }, []);

  useEffect(() => {
    const id = params.id;
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/csschallengesget`, {
        id: id,
      })
      .then((res) => {
        // if(message){
        //       toast(message,{
        //         position: "top-center",
        //       });
        //     }
        if (res.data.message) {
          toast(res.data.message, {
            position: "top-center",
          });
        }
        setCssdata(res.data.challenges);
        setIsLoading(false);
        setSortedSubmissions(res.data.sortedSubmissions);
        console.log("dddddddddddddddddddddddddddddddddddd");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
useEffect(() => {
  console.log(votesno);
}, [votesno]);
  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Loader />
      </div>
    ); 
  }

  if (!Cssdata) {
    return (
      <>
        <p>Challenge not found</p>
      </>
    );
  }

  return (
    <>
      {user?.Permissions.includes("admin") ||
      user?.Permissions.includes("editchallenges") ? (
        <div className='flex justify-center items-center m-5 gap-[2rem]'>
          <EditChallengeModal Cssdata={Cssdata} setCssdata={setCssdata} />
          <DeleteModal id={Cssdata.id} />
        </div>
      ) : (
        ""
      )}
      {/* {user?.Permissions.includes("admin") ||
      user?.Permissions.includes("deletechallenges") ? (
        <div className='flex justify-center items-center m-5'>
          <DeleteModal id={Cssdata.id} />
        </div>
      ) : (
        ""
      )} */}

      <div className='flex justify-center items-center'>
        <Csschallengecard
          id={Cssdata.id}
          title={Cssdata.title}
          description={Cssdata.description}
          sdesc={Cssdata.sdesc}
          img={Cssdata.img}
          status={Cssdata.status}
          sdate={Cssdata.date.from}
          edate={Cssdata.date.to}
          numSubmissions={Cssdata.submissions.length}
        />
      </div>
      <div className='flex justify-center items-center m-5'>
        <Link to={`/CssChallengecreate/${Cssdata.id}`}>
          <Btn Text='Create' color='primary' />
        </Link>
      </div>
      <section>
        <div className='flex justify-center items-center'>
          <div className='w-[50%]'>
            <h1 className='text-4xl font-bold text-center'>Submissions</h1>
          </div>
        </div>
      </section>
      <div className='mx-[10rem]'>
        <section className='csscards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center'>
          {sortedSubmissions?.map((sub: any, index) => {
            return (
              <ChallengesPosts
                htmlcssPairs={sub}
                key={index}
                cid={id}
                setSortedSubmissions={setSortedSubmissions}
              />
            );
          })}
        </section>
      </div>
    </>
  );
};

export default CssChallengeDescription;
