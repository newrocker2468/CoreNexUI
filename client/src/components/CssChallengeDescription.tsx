import { Link, useParams } from "react-router-dom";
import Csschallengecard from "./Csschallengecard";
import "@/Styles/CssChallengeDescription.css";
import uiverse from "@/images/uiversecss2.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditChallengeModal from "./EditChallengeModal";
import Btn from "./Btn";
import { v4 as uuidv4 } from "uuid";
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
}

const CssChallengeDescription = () => {
  const params = useParams();
  const [Cssdata, setCssdata] = useState<Challenge1 | null>(null);

  
// console.log(Cssdata)
  //!SECTION to fetch data from the server
  useEffect(() => {
    const id = params.id;
    axios
      .post("http://localhost:3000/csschallengesget/", {
        id: id,
      })
      .then((res) => {
        // console.log("res.data");
        // console.log(res.data);
        setCssdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  if (!Cssdata) {
    return (
      <>
        <p>Challenge not found</p>
      </>
    );
  }


  return (
    <>
      <div className='flex justify-center align-center m-5'>
        <EditChallengeModal
          Cssdata={Cssdata}
          setCssdata={setCssdata}
        />
      </div>
      <div className='flex justify-center align-center m-5'>
        <DeleteModal id={Cssdata.id} />
      </div>
      <div className='flex justify-center align-center'>
        <Csschallengecard
          id={Cssdata.id}
          title={Cssdata.title}
          description={Cssdata.description}
          sdesc={Cssdata.sdesc}
          img={Cssdata.img}
          status={Cssdata.status}
          sdate={Cssdata.date.from}
          edate={Cssdata.date.to}
        />
      </div>
      <Link to={`/CssChallengecreate/${uuidv4()}`}>
        <Btn Text='Submit' color='primary' />
      </Link>
      <section>
        <div className='flex justify-center align-center'>
          <div className='w-[50%]'>
            <h1 className='text-4xl font-bold text-center'>Submissions</h1>
          </div>
        </div>
      </section>

      <section className='csscards'>
        <div className='css-card '>
          <img src={`${uiverse}`} alt='' className='css-card-img' />{" "}
          <p className='pl-3 text-left'>Name here </p>
        </div>
        <div className='css-card '>
          <img src={`${uiverse}`} alt='' className='css-card-img' />{" "}
          <p className='pl-3 text-left'>Name here </p>
        </div>
        <div className='css-card '>
          <img src={`${uiverse}`} alt='' className='css-card-img' />{" "}
          <p className='pl-3 text-left'>Name here </p>
        </div>
        <div className='css-card '>
          <img src={`${uiverse}`} alt='' className='css-card-img' />{" "}
          <p className='pl-3 text-left'>Name here </p>
        </div>
      </section>
    </>
  );
};

export default CssChallengeDescription;
