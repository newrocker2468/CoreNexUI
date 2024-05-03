import React, { useState } from "react";
import folder from "../Icons/folder.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function FileList({ files }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (index) => {
    setActiveIndex(index);
onOpen
  };

  const handleClose = () => {
    setIsModalOpen(false);
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
          onMouseOver={() => setActiveIndex(index)}
          onMouseOut={() => setActiveIndex(-1)}
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
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
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
