import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { toast } from "sonner";

export default function FileList({ files,setFiles }) {
  const { onOpen } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [user,setUser]=useState<any>(null)
useEffect(() => {
  axios.get("http://localhost:3000/getuser", {
    withCredentials: true,
  }).then((res) => {
    setUser(res.data.user);
  });
},[])
  const handleClick = (index: React.SetStateAction<number | null>) => {
    setActiveIndex(index);
    onOpen();
    setIsModalOpen(true);
  };

  // const handleClose = () => {
  //   setIsModalOpen(false);
  //   setActiveIndex(-1); // Set activeIndex to -1 when the modal is closed
  // };

  const deleteNote = (noteId: string) => {
    axios
      .post(`http://localhost:3000/notes/upload/${noteId}/delete`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Note Deleted Successfully", {
            position: "top-center",
          });
          // Remove the deleted note from the local state so the UI updates
          setFiles(files.filter((file: { _id: string; }) => file._id !== noteId));
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while deleting the note.", {
          position: "top-center",
        });
      });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
      }}
    >
      {files.map((file, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            textWrap: "pretty",
            backgroundColor: index === activeIndex ? "grey" : "",
            cursor: "pointer",
          }}
          onMouseOver={() => !isModalOpen && setActiveIndex(index)} // Only change activeIndex when modal is not open
          onClick={() => handleClick(index)}
        >
          <img
            src={file.path}
            alt='file-icon'
            style={{
              marginBottom: "10px",
              maxHeight: "100px",
              maxWidth: "100%",
            }}
          />
          <p style={{ wordWrap: "anywhere", maxWidth: "200px" }}>
            {file.filename.length > 20
              ? `${file.filename.substring(0, 20)}...`
              : file.filename}
          </p>
          <p>{file.size} KB</p>
          <p>{file.uploadDate}</p>
          {/* {(user?.Permissions?.includes("deletenotes") ||
            user?._id === file.user) && (
            <Button color='danger' onClick={() => deleteNote(file._id)}>
              Delete Note
            </Button>
          )} */}
          {/* <Button color='danger' onClick={() => deleteNote(file._id)}>
            Delete Note
          </Button> */}
        </div>
      ))}
      {isModalOpen && activeIndex !== null && (
        <Modal
          scrollBehavior='inside'
          size='4xl'
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Modal Title
                </ModalHeader>
                <ModalBody
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Link
                    isBlock
                    showAnchorIcon
                    href={files[activeIndex] && files[activeIndex].path}
                    color='foreground'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Open File in New Tab
                  </Link>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      overflow: "auto",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {files[activeIndex] &&
                    files[activeIndex].mimetype === "application/pdf" ? (
                      <iframe
                        src={files[activeIndex].path}
                        width='100%'
                        height='500px'
                      />
                    ) : (
                      <Image
                        src={files[activeIndex].path}
                        alt=''
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain", // Ensure the image scales down to fit within the div
                          margin: "auto", // Add this line
                        }}
                      />
                    )}
                  </div>
                  <div
                    className=''
                    style={{ wordWrap: "break-word", wordBreak: "break-all" }}
                  >
                    Name : {files[activeIndex] && files[activeIndex].filename}
                    <br />
                    Size : {files[activeIndex] && files[activeIndex].size} KB
                    <br />
                    Mime Type :{" "}
                    {files[activeIndex] && files[activeIndex].mimetype}
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {(user?.Permissions?.includes("deletenotes") ||
                    user?._id === files[activeIndex].user) && (
                    <Button
                      color='danger'
                      onClick={() => deleteNote(files[activeIndex]._id)}
                    >
                      Delete Note
                    </Button>
                  )}
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  {/* <Button color='primary' onPress={onClose}>
                    Action
                  </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}