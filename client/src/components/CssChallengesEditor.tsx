import { useState, useEffect, useRef, useContext } from "react";
import { Tabs, Tab, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
// import { useTheme } from "./theme-provider";
import SideBar from "./SideBar";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import Editor from "@monaco-editor/react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "./UserContext";
import { usePrompt } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import RadioCreateCss from "./ModalRadioCreateCss";
import { toast } from "sonner";

const LiveEditor = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useContext(UserContext);
  const [html, setHtml] = useState("<!--Code Here -->");
  const divRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [css, setCss] = useState("");
  console.log(id);

  const saveCode = () => {
    localStorage.setItem("html", html);
    localStorage.setItem("css", css);
  };

  function handleEditorDidMount(editor, monaco) {
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "tag", foreground: "569cd6" },
        { token: "attribute.name", foreground: "9cdcfe" },
        { token: "attribute.value", foreground: "ce9178" },
        { token: "delimiter.html", foreground: "808080" },
        { token: "delimiter.xml", foreground: "808080" },
      ],
      colors: {
        "editor.foreground": "#F8F8F8",
        "editor.background": "#232323",
        // Add more color settings as needed
      },
    });

    // Set your custom theme
    monaco.editor.setTheme("myTheme");
    if (!monaco) {
      console.error("Monaco is not initialized!");
      return;
    }

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["<", "b"],
      provideCompletionItems: function (model, position) {
        // your logic to generate suggestions
        return {
          suggestions: [
            {
              label: "button",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "<button class='btn'>Click Me!</button>",
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column - 3,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ],
        };
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["<", "d"],
      provideCompletionItems: function (model, position) {
        // your logic to generate suggestions
        return {
          suggestions: [
            {
              label: "div",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "<div class='container'></div>",
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column - 3,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ],
        };
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: [
        "<",
        "d",
        "*",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ],
      provideCompletionItems: function (model, position) {
        // Get the line up to the cursor position
        const line = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        // Extract the last word from the line
        const words = line.split(/\s+/);
        const text = words[words.length - 1];

        // Check if the text matches the shorthand syntax (e.g., "div*2")
        const match = text.match(/(\w+)\*(\d+)/);
        if (match) {
          const tag = match[1];
          const count = Number(match[2]);

          // Generate the HTML string based on the shorthand syntax
          let html = "";
          for (let i = 0; i < count; i++) {
            html += `<${tag}></${tag}>`;
          }

          // Return the generated HTML as a suggestion
          return {
            suggestions: [
              {
                label: `${tag}*${count}`,
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: html,
                range: {
                  startLineNumber: position.lineNumber,
                  startColumn: position.column - text.length,
                  endLineNumber: position.lineNumber,
                  endColumn: position.column,
                },
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              },
            ],
          };
        }

        // If the text doesn't match the shorthand syntax, return no suggestions
        return { suggestions: [] };
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["<", "d"],
      provideCompletionItems: function (model, position) {
        // your logic to generate suggestions
        return {
          suggestions: [
            {
              label: "a",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "<a href=''>Link</a>",
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column - 3,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ],
        };
      },
    });
    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["<", "d"],
      provideCompletionItems: function (model, position) {
        // your logic to generate suggestions
        return {
          suggestions: [
            {
              label: "img",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "<img src='' class='' alt=''/>",
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column - 3,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ],
        };
      },
    });
    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["<", "d"],
      provideCompletionItems: function (model, position) {
        // your logic to generate suggestions
        return {
          suggestions: [
            {
              label: "br",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "<br/>",
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column - 3,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ],
        };
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: [">", "."],
      provideCompletionItems: (model, position) => {
        const codePre: string = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const tag = codePre.match(/.*<(\w+)>$/)?.[1];

        // List of unpaired tags in HTML
        const unpairedTags = [
          "area",
          "base",
          "br",
          "col",
          "command",
          "embed",
          "hr",
          "img",
          "input",
          "keygen",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
        ];
        let flag = true;
        // If the tag is unpaired, return an empty suggestions object
        if (unpairedTags.includes(tag)) {
          flag = false;
          return { suggestions: [] };
        }

        // Check if the tag is not in the list of unpaired tags
        if (tag && flag) {
          const word = model.getWordUntilPosition(position);

          return {
            suggestions: [
              {
                label: `</${tag}>`,
                kind: monaco.languages.CompletionItemKind.EnumMember,
                insertText: `$1</${tag}>`,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn,
                  endColumn: word.endColumn,
                },
              },
            ],
          };
        } else {
          // If the tag is null, return an empty suggestions object
          return { suggestions: [] };
        }
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: [
        "*",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ],
      provideCompletionItems: function (model, position) {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const match = textUntilPosition.match(/lorem\*(\d+)$/);

        if (match) {
          const number = parseInt(match[1]);

          // Generate 'number' of lorem ipsum paragraphs
          let loremText = "";
          for (let i = 0; i < number; i++) {
            loremText +=
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          }

          return {
            suggestions: [
              {
                label: `lorem*${number}`,
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: loremText,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: position.lineNumber,
                  startColumn: position.column - match[0].length,
                  endLineNumber: position.lineNumber,
                  endColumn: position.column,
                },
              },
            ],
          };
        } else {
          return { suggestions: [] };
        }
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: [
        ">",
        ".",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "*",
      ],
      provideCompletionItems: function (model, position) {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: model.getLineMaxColumn(position.lineNumber),
        });

        console.log(textUntilPosition);
        // Adjust the regular expression to match 'tag.class*number'
        //  const match = textUntilPosition.match(/(\w+)\.(\w+)\*(\d+)$/);
        const match = textUntilPosition.match(/(\w+)\.(\w+)\*(\d+)$/);
        console.log(match);
        if (match) {
          const tagName = match[1];
          const className = match[2];
          const number = parseInt(match[3]);

          // Generate 'number' of HTML elements
          let elements = "";
          for (let i = 0; i < number; i++) {
            elements += `<${tagName} class="${className}"></${tagName}>\n`;
          }

          return {
            suggestions: [
              {
                label: `${tagName}.${className}*${number}`,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: elements,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: position.lineNumber,
                  startColumn: position.column - match[0].length,
                  endLineNumber: position.lineNumber,
                  endColumn: position.column,
                },
              },
            ],
          };
        } else {
          return { suggestions: [] };
        }
      },
    });
    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["."],
      provideCompletionItems: function (model, position) {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const match = textUntilPosition.match(/(\w+)\.(\w+)$/);

        // console.log(match)
        if (match) {
          const tagName = match[1];
          const className = match[2];
          // console.log(tagName, className);
          // console.log(position.column)
          // console.log(match[0].length)
          // console.log(position.column - match[0].length+1);
          // const test =position.column - match[0].length+1
          return {
            suggestions: [
              {
                label: `<${tagName}.${className}>`,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: `<${tagName} class="${className}"></${tagName}>`,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: position.lineNumber,
                  startColumn:
                    position.column - (className.length + tagName.length + 1),
                  endLineNumber: position.lineNumber,
                  endColumn: position.column,
                },
              },
            ],
          };
        } else {
          return { suggestions: [] };
        }
      },
    });

    editor.onDidChangeModelContent((event) => {
      // Get the changes from the event
      const changes = event.changes;

      // List of unpaired tags in HTML
      const unpairedTags = [
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ];

      // Loop through each change
      for (const change of changes) {
        // Check if the last typed character is '>'
        if (change.text === ">") {
          // Get the current model and position
          const model = editor.getModel();
          const position = editor.getPosition();

          // Get the code before the '>'
          const codePre = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });
          // Find the tag
          const tag = codePre.match(/.*<(\w+)>$/)?.[1];

          // If a tag was found and it's not an unpaired tag, insert the closing tag
          if (tag && !unpairedTags.includes(tag)) {
            const closingTag = `</${tag}>`;
            model.pushEditOperations(
              [],
              [
                {
                  range: new monaco.Range(
                    position.lineNumber,
                    position.column,
                    position.lineNumber,
                    position.column
                  ),
                  text: closingTag,
                },
              ]
            );
          }
        }
      }
    });
  }
  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(saveCode, 30000);
    return () => clearTimeout(timer);
  }, [html, css]);

  const login = user.isLoggedIn;

  const email = user.email;
  const [Category, setCategory] = useState("");
  const uploadToDatabase = () => {
    fetch(`http://localhost:3000/editor/create/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ html, css, login, email, Category, isSelected }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate("/Csselements");
          toast.success(data.message, {
            position: "top-center",
            action:
              data.message === "You are not logged in. Login First" ? (
                <Link isBlock showAnchorIcon href='/login' color='foreground'>
                  Login
                </Link>
              ) : null,
          });
        }

        console.log(data);
      });
  };

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
      ${css}
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
        body {
              all: initial;
          display:flex;
          align-items: center;
          justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #e8e8e8;
      }
.container{
           all: initial;
           display:flex;
          align-items: center;
          justify-content: center;
}
    </style>
    <div class='container'>
    ${html}
    
    </div>
  `;
    // shadowRoot.addEventListener("click", (event) => {
    //   event.stopPropagation();
    // });

    // div.addEventListener("click", (event) => {
    //   if (event.target === div) {
    //     if (window.location.pathname === `/Csselements`) {
    //       navigate(`/editor/${htmlcssPairs.id}`);
    //     }
    //   }
    // });
  }, [html, css]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    // const contentWidth = div.scrollWidth;
    const contentHeight = div.scrollHeight;

    // const newWidth = contentWidth * 1.1;
    const newHeight = contentHeight;

    div.style.width = `40dvw`;
    div.style.height = `70dvh`;
  }, [html, css]);
  const redirect = () => {
    navigate("/Csselements");
  };

  // const { theme } = useTheme();

  const { onOpenChange } = useDisclosure();
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 800
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div style={{ display: "flex" }}>
      {isSidebarVisible && (
        <div className='flex-shrink-0 overflow-auto h-screen'>
          <SideBar />
        </div>
      )}

      <div className='flex flex-wrap justify-center w-full'>
        <div
          style={{ height: "max-content" }}
          className='flex justify-center align-center flex-col mt-[2rem] md:w-[50%] w-[95%]'
        >
          <Modal isOpen={isModalVisible} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <div className='flex align-center justify-center'>
                      <RadioCreateCss
                        Category={Category}
                        setCategory={setCategory}
                        setHtml={setHtml}
                        setCss={setCss}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color='danger'
                      variant='light'
                      onPress={() => {
                        redirect();
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      color='primary'
                      onPress={() => {
                        setIsModalVisible(false);
                      }}
                    >
                      Start
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <h3>Output</h3>
          <div className='relative'>
            <div className='absolute top-3 right-4 '>
              <Switch
                isSelected={isSelected}
                onValueChange={setIsSelected}
                className='z-10'
              >
                {!isSelected ? (
                  <span className='text-black font-bold'>#e8e8e8</span>
                ) : (
                  <span className='font-bold text-white'>#212121</span>
                )}
              </Switch>
            </div>
            <div
              ref={divRef}
              className='container'
              style={{
                borderRadius: "1rem",
                zIndex: 1,
                position: "relative",
                backgroundColor: `${!isSelected ? "#e8e8e8" : "#212121"}`,
                width: "auto",
                minWidth: "100%",
                maxWidth: "100%",
                height: "auto",
                minHeight: "20rem",
                maxHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            />
          </div>
        </div>

        <div className='flex flex-col h-[60dvh] md:w-[50%] w-[95%]'>
          <div className='flex justify-end absolute right-0'>
            <div className='mr-[4rem]'>
              <Button  color='primary'>
                Submit
              </Button>
            </div>
          </div>
          <Tabs aria-label='Options'>
            <Tab key='Html' title='HTML'>
              <Card>
                <CardBody>
                  <div style={{ maxHeight: "70dvh", overflowY: "hidden" }}>
                    <Editor
                      options={{
                        minimap: {
                          enabled: false,
                        },
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        fontSize: 18,
                        wordWrap: "on",
                      }}
                      height='100vh'
                      defaultLanguage='html'
                      value={html}
                      onChange={(newValue) => setHtml(newValue)}
                      defaultValue='<!--Enter Your Html Code Here-->'
                      onMount={handleEditorDidMount}
                      className='border-2 border-black rounded overflow-hidden'
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key='Css' title='Css'>
              <Card>
                <CardBody>
                  <div style={{ maxHeight: "70dvh", overflowY: "scroll" }}>
                    <Editor
                      options={{
                        minimap: {
                          enabled: false,
                        },
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        fontSize: 18,
                        wordWrap: "on",
                      }}
                      height='100vh'
                      defaultLanguage='css'
                      value={css}
                      onChange={(newValue) => setCss(newValue)}
                      defaultValue=''
                      onMount={handleEditorDidMount}
                      className='border-2 border-black rounded overflow-hidden'
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LiveEditor;
