import { useParams } from "react-router-dom";
import "@/Styles/CssChallengeDescription.css";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { FC } from "react";
import Btn from "./Btn";

import { useNavigate } from "react-router-dom";
interface Challenge {
  id: string | undefined;
}
type Variant = "opaque"| "blur" |"transparent";

const DeleteModal:FC <Challenge>=({id}) =>{
     const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState <Variant>("opaque");
  const params = useParams();


const CreateChallenge = async (id: string | undefined) => {
  await fetch(`http://localhost:3000/csschallengesdelete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then(async (response) => {
    if (response) {
      navigate("/Csschallenges?Delete=true", {
        state: {
          message: "Challenge Deleted Successfully",
        },
      });
    }
  });
};


  return (
    <>
      <Button onPress={onOpen} color='danger'>
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Are Your Sure You Want To Delete This Challenge? Data once
                  deleted cannot be recovered
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='light' onPress={onClose}>
                  Close
                </Button>
                {/* <Button
                  color='danger'
                  onPress={onClose}
                  onClick={CreateChallenge}
                >
                  Delete
                </Button> */}
                <Btn
                  Text='Delete'
                  color='danger'
                  onPress={onClose}
                  onClick={(e) => {
                    e.preventDefault();
                    CreateChallenge(params.id);
                  }}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default DeleteModal;