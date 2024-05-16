/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import "@/Styles/Csselements.css";
import { useParams } from "react-router-dom";

interface CssElementProps {
  htmlcssPairs: { html: string; css: string; id: string ,_id?:string,isSelected?:boolean};
}

const CssElement: FC<CssElementProps> = ({ htmlcssPairs }) => {
  // console.log(htmlcssPairs);

   const [isSelected] = useState(
htmlcssPairs.isSelected
   );
const [,setheight]=useState(120)
  const divRef = useRef<HTMLDivElement>(null);
  useParams<{ id: string; }>();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event: any) => {
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

    // const contentWidth = div.scrollWidth;
    const contentHeight = div.scrollHeight;

    // const newWidth = contentWidth * 1.1;
    const newHeight = contentHeight * 1.1;
setheight(div.scrollHeight);
    // div.style.width = `${newWidth}px`;
    div.style.height = `${newHeight}px`;

    div.addEventListener("click", handleClick);

    return () => {
      div.removeEventListener("click", handleClick);
    };
  }, [htmlcssPairs.html, htmlcssPairs.css, htmlcssPairs.id, handleClick]);

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
  box-sizing: border-box !important;
}
   
      .main {
        all:initial;
        display:flex;
        align-items: center;
        justify-content: center;
 maxHeight: "100%";
 overflow:"hidden";
      }
      

   
    </style>


<div class="main">
      ${htmlcssPairs.html} 
</div>
    </div>
    
  `;
    div.addEventListener("click", handleClick);
  div.addEventListener("click", (event) => {
    console.log("clicked");
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
    
  }, [htmlcssPairs.html, htmlcssPairs.css, navigate, htmlcssPairs.id, htmlcssPairs._id, handleClick]);

  return (
    <>
      <>
        <div
          ref={divRef}
          className='container'
          style={{
            borderRadius: "1rem",
            zIndex: 1,
            position: "relative",
            cursor: "pointer",
            backgroundColor: `${isSelected ? "#e8e8e8" : "#212121"}`,
          // minWidth:"max-content",
            // width: "max-content",
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "20rem",
            maxHeight: "20rem",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            overflow: "hidden",
          }}
        />
      </>
    </>
  );
};

export default CssElement;
