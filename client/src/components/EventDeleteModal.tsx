import { useParams } from "react-router-dom";
import "@/Styles/EventDescription.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios"
import { FC } from "react";
import Btn from "./Btn";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface Challenge {
  id: string | undefined;
}

const EventDeleteModal:FC <Challenge>=() =>{
     const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();


const EventDelete = async (id: string | undefined) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/event/${id}/delete`,
      { id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response) {
      toast.success(response.data.message,{
        position: "top-center",
      })
      navigate(-1);
    }
  } catch (error) {
    console.error(error);
  }
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
                  Are Your Sure You Want To Delete This Event? Data once
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
                  onClick={(e: { preventDefault: () => void; }) => {
                    e.preventDefault();
                    EventDelete(params.id);
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
export default EventDeleteModal;