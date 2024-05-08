import  { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function CodeEditor1() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  return (
    <CodeEditor
      value={code}
      language='html'
      placeholder='Please enter JS code.'
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
}
