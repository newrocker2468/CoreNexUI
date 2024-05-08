/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import "@/Styles/CssChallengeDescription.css";
import { FC, useEffect, useState } from "react";
import React, { Dispatch, SetStateAction } from "react";
import "@/Styles/EventDescription.css";

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
import InputFile from "./FileInput";
import { DateRange } from "react-day-picker";
import DatePickerrange from "./DatePickerrange";
import { Textarea } from "@nextui-org/react";
import Btn from "./Btn";
import EditIcon from "@/Icons/edit (1).png";
import uiversecss from "@/images/uiversecss2.jpg";
import { addDays, format } from "date-fns";
import { toast } from "sonner";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios from "axios";
interface Challenge1 {
  id: string | undefined;
  eventName: string | undefined;
  sdesc: string | undefined;
  description: string | undefined;
  img: string | undefined;
  status: string | undefined;
  date: {
    from: string | undefined;
    to: string | undefined;
  };
}
interface EditProps {
  Cssdata: Challenge1;
  setCssdata: Dispatch<SetStateAction<Challenge1 | null>>;
}

const EditEventModal: FC<EditProps> = ({
  Cssdata,
  setCssdata,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const storedStartDate = Cssdata?.date?.from
    ? new Date(Cssdata.date.from)
    : new Date();
  const storedEndDate = Cssdata?.date?.to
    ? new Date(Cssdata.date.to)
    : addDays(new Date(), 7);
  const [id] = useState(`${Cssdata?.id}`);
const [ ,setUser]=useState<any>(null)
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: storedStartDate,
    to: storedEndDate,
    // from: new Date(),
    // to: addDays(new Date(), 7),
  });


 const firebaseConfig = {
   apiKey: import.meta.env.VITE_API_KEY,
   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_PROJECTID,
   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
   appId: import.meta.env.VITE_APPID,
   measurementId: import.meta.env.VITE_MEASUREMENTID,
 };
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
 getStorage(app);
const uploadToFirebase = (
  file: Blob | Uint8Array | ArrayBuffer,
  name:string,
): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, name);

  return uploadBytes(storageRef, file).then(() => {
    console.log("Uploaded a blob or file!");
    return getDownloadURL(storageRef);
  });
};


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };




const EditEvent = async (id: string, displayImage: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/event/${id}/update`,
      createFormData(id, displayImage),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if(response.data.message){
      toast(response.data.message, {
        position: "top-center",
      });
    
    }


    if (response.data.message) {
      toast(response.data.message, {
        position: "top-center",
      });
    }

    toast.success("Event has been Updated Successfully !", {
      duration: 2500,
      position: "top-center",
      action: {
        label: "X",
        onClick: () => console.log("Action"),
      },
    });
    // setCssdata(response.data);
  } catch (error) {

    console.error("Error:", error);
  }
};
const fetchuserdata = async () => {
  console.log("fetchuserdata");
  axios.get("http://localhost:3000/validate-token", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }).then((response) => {
    console.log(response.data);
        if(response.data.user){
         setUser(response.data.user)
        }
  })
}
useEffect(() => {
  fetchuserdata()
}, [])
  const SubmitHandler = async () => {

  if (files && files.length > 0) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      // const displayImage = reader.result as string;
      const file = files[0];
      const name = file.name;
      console.log(name);
      const imageUrl = await uploadToFirebase(file, name); // assuming this returns a Promise that resolves with the image URL
      const formdata = createFormData(id, imageUrl);
      setCssdata({ ...Cssdata, ...formdata });
      EditEvent(id, imageUrl);
      setFiles([]);
    };
    reader.readAsDataURL(files[0]);
  } else {
    const formdata = createFormData(id, uiversecss);
    setCssdata({ ...Cssdata, ...formdata });
    EditEvent(id, uiversecss);
  }


}

 


  const createFormData = (_id: string, img: string) => {
    const StartDate = date?.from ? format(date.from, "MMM dd, yyyy") : "";
    const EndDate = date?.to ? format(date.to, "MMM dd, yyyy") : "";

    return {
      id: Cssdata?.id,
      eventName: Cssdata?.eventName,
      sdesc: Cssdata?.sdesc,
      description: Cssdata?.description,
      img: img,
      status: Cssdata?.status,
      date: {
        from: StartDate,
        to: EndDate,
      },
    };
  };

  return (
    <>
      <Btn Text='Edit' onPress={onOpen} color='primary' logo={EditIcon} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        size='3xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Enter Event Details
              </ModalHeader>
              <ModalBody>
                <div className='flex'>
                  <div className='w-[50%] m-[0.5rem]'>
                    <Input
                      placeholder='Enter Challenge eventName'
                      label='eventName'
                      value={Cssdata.eventName}
                      onChange={(e) => {
                        setCssdata({
                          ...Cssdata,
                          eventName: e.target.value,
                        });
                      }}
                    />{" "}
                  </div>

                  <div className='w-[50%] m-[0.5rem]'>
                    {" "}
                    <Input
                      isClearable={true}
                      placeholder='Enter Short Challenge Description'
                      label='Short Description'
                      value={Cssdata.sdesc}
                      onChange={(e) => {
                        setCssdata({
                          ...Cssdata,
                          sdesc: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className='w-full m-[0.5rem]'>
                  <Textarea
                    label='Description'
                    placeholder='Enter Event Description'
                    className='max-w-3xl'
                    maxRows={3}
                    value={Cssdata.description}
                    onChange={(e) => {
                      setCssdata({ ...Cssdata, description: e.target.value });
                    }}
                  />
                </div>

                <div className='flex justify-around align-center'>
                  <div className='w-[50%] m-[0.5rem] mt-[0.55rem]'>
                    <InputFile
                      label='Choose Your desire image'
                      setFiles={handleFileChange}
                    />
                  </div>
                  <div className='w-[50%] m-[0.5rem]'>
                    <span className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Duration{" "}
                    </span>{" "}
                    <DatePickerrange date={date} setDate={setDate} />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={onClose}
                  onClick={SubmitHandler}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditEventModal;