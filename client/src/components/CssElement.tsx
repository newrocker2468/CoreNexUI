import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { FC } from "react";
import "@/Styles/Csselements.css";
import { useParams } from "react-router-dom";

interface CssElementProps {
  htmlcssPairs: { html: string; css: string; id: string };
}

const CssElement: FC<CssElementProps> = ({ htmlcssPairs }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    // Only attach a shadow root if one doesn't already exist
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
      div:hover .get-code {
        display: block;
      }
    </style>
    <div class='main'>
      ${htmlcssPairs.html}
    </div>
  `;
    shadowRoot.addEventListener("click", (event) => {

      event.stopPropagation();
    });
    // Add a click event listener to the div
    // Add a click event listener to the div
    div.addEventListener("click", (event) => {
      // Only navigate if the target of the click event is the div itself
      if (event.target === div) {
        if (window.location.pathname === `/Csselements`) {
          navigate(`/editor/${htmlcssPairs.id}`);
          
        } 
      }
        // event.stopPropagation();
        // navigate(`/editor/${htmlcssPairs.id}`);
    });

    // Prevent clicks on the main div from bubbling up to the outer div
    const mainDiv = shadowRoot.querySelector(".main");
    // mainDiv.addEventListener("click", (event) => {
    //   event.stopPropagation();
    // });
  }, [htmlcssPairs.html, htmlcssPairs.css, navigate, htmlcssPairs.id]);

  return (
    <>
      <div
        ref={divRef}
        style={{
          borderRadius: "1rem",
          zIndex: 1,
          position: "relative",
          cursor: "pointer",
          backgroundColor: "#e8e8e8",
          // padding: "2.25rem",
          // width: "100%",
          // width: "19rem",
          minWidth: "250px",
          maxWidth: "520px",
          minHeight: "20rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <h1></h1>
    </>
  );
};

export default CssElement;
