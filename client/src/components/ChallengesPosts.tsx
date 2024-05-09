/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import "@/Styles/Csselements.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
interface ChallengesPosts {
  cid: string | undefined;
  htmlcssPairs: {
    html: string;
    css: string;
    id: string;
    _id?: string;
    isSelected?: boolean;
    votes: any;
  };

  setSortedSubmissions: any;
}







const ChallengesPosts: FC<ChallengesPosts> = ({
  htmlcssPairs,
  cid,
  setSortedSubmissions,
}) => {
  console.log(htmlcssPairs);

  const [isSelected] = useState(htmlcssPairs.isSelected);

  const divRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vote = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/challenges/${cid}/submissions/${
          htmlcssPairs._id
        }/vote`,
        {},
        {
          withCredentials: true,
        }
      );
     if (response.data.sortedSubmissions) {
       setSortedSubmissions(response.data.sortedSubmissions);
     }
      toast.info(response.data.message, {
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };

const handleClick = useCallback(
  (event: any) => {
    const target = event.target as HTMLDivElement;
    if (target === divRef.current) {
      if (window.location.pathname === `/Csschallenges/${id}`) {
        navigate(`/editor/${htmlcssPairs.id}`);
      }
    }
  },
  [id, navigate, htmlcssPairs.id]
);


  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const contentWidth = div.scrollWidth;
    const contentHeight = div.scrollHeight;

    const newWidth = contentWidth * 1.1;
    const newHeight = contentHeight * 1.1;

    div.style.width = `${newWidth}px`;
    div.style.height = `${newHeight}px`;
    div.addEventListener("click", handleClick);

    return () => {
      div.removeEventListener("click", handleClick);
    };
  }, [htmlcssPairs.html, htmlcssPairs.css, htmlcssPairs.id, id, handleClick]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    let shadowRoot = div.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = div.attachShadow({ mode: "open" });
    }
    shadowRoot.innerHTML = `
    <style>
      ${htmlcssPairs.css}
      * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
      body {
        height: 100vh;
        margin: 0;
        background-color: #e8e8e8;
        margin: auto;
      }
      .main {
        all:initial;
        display:flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
      .get-code {
      display: none;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: white;
      text-decoration: none;
      width: 100px;
      background-color: black;
      text-align: center;
    }
   
    </style>
    <div class='main'>
      ${htmlcssPairs.html}
    </div>
    
  `;

    div.addEventListener("click", handleClick);

    // div.addEventListener("click", handleClick);
    div.addEventListener("click", (event) => {
      console.log("clicked");
      if (htmlcssPairs._id) {
        navigate(`/csschallenge/editor/${htmlcssPairs._id}`);
      }
      if (event.target === div) {
        if (window.location.pathname === `/Csschallenges/${id}`) {
          navigate(`/csschallenge/editor/${htmlcssPairs.id}`);
        }
      }
    });
    shadowRoot.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }, [htmlcssPairs.html, htmlcssPairs.css, navigate, htmlcssPairs.id, htmlcssPairs._id, handleClick, id]);

  return (
    <>
      <div className='m-5'>
        <div
          ref={divRef}
          className='container'
          style={{
            borderRadius: "1rem",
            zIndex: 1,
            position: "relative",
            cursor: "pointer",
            backgroundColor: `${isSelected ? "#e8e8e8" : "#212121"}`,
            width: "auto",
            minWidth: "100%",
            maxWidth: "100%",
            height: "auto",
            minHeight: "20rem",
            maxHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            overflow: "hidden",
          }}
        />
        <button onClick={vote}>
          Vote <span>{htmlcssPairs.votes.length}</span>
        </button>
      </div>
    </>
  );
};

export default ChallengesPosts;
