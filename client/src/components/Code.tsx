/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from "react";
import {Highlight, themes } from "prism-react-renderer";
import { useTheme } from "./theme-provider";
// import {defaultTheme} from "prism-react-renderer";


interface Codeprops {
  newTextToWrite?: string;
  codeLast?: string;
  animationDelay?: number;
  code: string;
  show: boolean;
  animated?: boolean;
  maxHeight?: number;
  startLine?: number;
  endLine?: number;
}
const Code: FC<Codeprops> = ({
  newTextToWrite,
  codeLast,
  code,
  animationDelay,
  animated,
  show,
  
}) => {
  const initialText = codeLast ? code + codeLast : code;
  const [text, setText] = useState(animated ? "" : initialText);
  const { theme } = useTheme();
  // useEffect(() => {
  //   let i = 0;
  //   const interval = setInterval(
  //     () => {
  //       if (i < initialText.length - 1) {
  //         setText((prev) => prev + initialText[i]);
  //         i++;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     },
  //     animationDelay ? animationDelay : 50
  //   );
  //   return () => clearInterval(interval); // This will clear the interval if the component unmounts
  // }, [initialText, show]);
  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(
        () => {
          const interval = setInterval(() => {
            setText(initialText.slice(0, i));
            i++;
            if (i > initialText.length) {
              clearInterval(interval);
            }
          }, 30);
          return () => clearInterval(interval);
        },
        animationDelay ? animationDelay : 50
      );
    }
  }, [animated, animationDelay, initialText, show]);

  // console.log(text);

  useEffect(() => {
    if (newTextToWrite) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          if (codeLast) {
            setText(code + newTextToWrite.slice(0, i) + codeLast);
          } else {
            setText(code + newTextToWrite.slice(0, i));
          }
          i++;
          if (i > newTextToWrite.length) {
            clearInterval(intervalId);
          }
        }, 50);

        return () => clearInterval(intervalId);
      });
    }
  }, [code, codeLast, newTextToWrite]);
  return (
    <>
      <Highlight
        // {...defaultTheme}
        theme={theme === "dark" ? themes.shadesOfPurple : themes.oneLight}
        code={text}
        language='tsx'
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              backgroundColor: "transparent",
              paddingTop: 0,
              paddingBottom: 0,
              // maxHeight: show ? (maxHeight ? maxHeight : 24) : 0,
              opacity: show ? 1 : 0,
              height: "auto",
              width: "inherit",
            }}
            className={className + "transition-all duration-700"}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                style={{ position: "relative" }}
                className='text-pretty overflow-hidden'
              >
                {" "}
                {/* <span>{lineNumber}</span> */}
                {/* <span>{i + 1}</span> */}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} className='' />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  );
};

export default Code;
