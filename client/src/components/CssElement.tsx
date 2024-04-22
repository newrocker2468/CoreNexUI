import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  // Get the content size
  const contentWidth = div.scrollWidth;
  const contentHeight = div.scrollHeight;

  // Calculate the new size
  const newWidth = contentWidth * 1.1;
  const newHeight = contentHeight * 1.1;

  // Set the new size
  div.style.width = `${newWidth}px`;
  div.style.height = `${newHeight}px`;
}, [htmlcssPairs.html, htmlcssPairs.css, navigate, htmlcssPairs.id]);

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
          width: "auto", // change this to auto
          minWidth: "100%", // minimum width
          maxWidth: "100%", // maximum width
          height: "auto", // change this to auto
          minHeight: "20rem", // set a minimum height
          maxHeight: "100%", // set a maximum height
          display: "flex",
          alignItems: "stretch", // add this
          justifyContent: "center",
          overflow: "hidden", // change this to auto to handle overflow
        }}
      />

      <h1></h1>
    </>
  );
};

export default CssElement;
