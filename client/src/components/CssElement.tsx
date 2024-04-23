import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import "@/Styles/Csselements.css";
import { useParams } from "react-router-dom";

interface CssElementProps {
  htmlcssPairs: { html: string; css: string; id: string ,_id?:string};
}

const CssElement: FC<CssElementProps> = ({ htmlcssPairs }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event: { target: HTMLDivElement | null; }) => {
      if (event.target === divRef.current) {
        if (window.location.pathname === `/Csselements`) {
          navigate(`/editor/${htmlcssPairs.id}`);
        }
      }
    },
    [navigate, htmlcssPairs.id]
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

    // div.addEventListener("click", handleClick);

    // return () => {
    //   div.removeEventListener("click", handleClick);
    // };
  }, [htmlcssPairs.html, htmlcssPairs.css, handleClick, htmlcssPairs.id]);

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
    .container::before {
      content: "\\1F5CE"; /* Unicode for code sign */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7); /* Black background with 70% opacity */
      backdrop-filter: blur(5px); /* Blur effect */
      color: white;
      font-size: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease; /* Smooth transition */
    }   .get-code {
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
      div:hover .get-code {
        display: block;
      }
    </style>
    <div class='main'>
      ${htmlcssPairs.html}
    </div>
    
  `;div.addEventListener("click", (event) => {
    if(htmlcssPairs._id){
     navigate(`/editor/${htmlcssPairs._id}`);
    }
      if (event.target === div) {
        if (window.location.pathname === `/Csselements`) {
          navigate(`/editor/${htmlcssPairs.id}`);
        
      }}})
    shadowRoot.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    
  }, [htmlcssPairs.html, htmlcssPairs.css, navigate, htmlcssPairs.id]);

  return (
    <>
      <div
        ref={divRef}
        className='container'
        style={{
          borderRadius: "1rem",
          zIndex: 1,
          position: "relative",
          cursor: "pointer",
          backgroundColor: "#e8e8e8",
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
      <h1></h1>
    </>
  );
};

export default CssElement;
