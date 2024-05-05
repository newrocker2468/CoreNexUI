import React, { useEffect, useState } from "react";
import folder from "../Icons/folder.png";
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

export default function FileList({ files }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (index) => {
    setActiveIndex(index);
    onOpen();
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setActiveIndex(-1); // Set activeIndex to -1 when the modal is closed
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
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button color='primary' onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
