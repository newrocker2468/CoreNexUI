import React, { Dispatch, SetStateAction } from "react";
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
import { v4 as uuidv4 } from "uuid";
import InputFile from "./FileInput";
import { addDays, set } from "date-fns";
import { DateRange } from "react-day-picker";
import DatePickerrange from "./DatePickerrange";
import { FC } from "react";
import uiversecss from "@/images/uiversecss2.jpg";
import { format } from "date-fns";
import { Textarea } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
interface Challenge {
  id: string;
  title: string;
  sdesc: string;
  description: string;
  img: string;
  status: string;
  date: { from: string; to: string };
}
interface CreatechallengesModalProps {
  Cssdata: Challenge[];
  Setdata: Dispatch<SetStateAction<Challenge[]>>;
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
}

const CreatechallengesModal: FC<CreatechallengesModalProps> = ({
  Cssdata,
  Setdata,
  showToast,
  setShowToast,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [sdesc, setsdesc] = useState("");
  const [desc, setdesc] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
    // from: new Date(2022, 0, 20),
    // to: addDays(new Date(2022, 0, 20), 20),
  });
  const [image, setImg] = useState("");
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
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
  
const uploadToFirebase = (
  file: Blob | Uint8Array | ArrayBuffer,
  name: string
): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, name);

  return uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    return getDownloadURL(storageRef);
  });
};



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };
  

  const CreateChallenge = async (id: string, displayImage: string) => {
    fetch(`http://localhost:3000/csschallenges/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createFormData(id,displayImage)),
    }).then((response) => {
      if (response) {
        setShowToast(true);
        navigate("/Csschallenges", {
          state: {
            message: "Challenge Created Successfully",
          },
        });
      }
    });
    // setFlag(!flag);
  };

  const SubmitHandler = async() => {
    const id = uuidv4();
    if (files && files.length > 0) {
      const reader = new FileReader();
 reader.onloadend = async () => {
   const displayImage = reader.result as string;
   const file = files[0];
   const name = file.name 
   const imageUrl = await uploadToFirebase(file, name); // assuming this returns a Promise that resolves with the image URL
   const formdata = createFormData(id, imageUrl);
   console.log(imageUrl);
   Setdata([...Cssdata, formdata]);
   CreateChallenge(id, imageUrl);
   console.log(imageUrl);
   setFiles([]);
 };

      reader.readAsDataURL(files[0]);
    } else {
      const formdata = createFormData(id,uiversecss);
      Setdata([...Cssdata, formdata]);
      CreateChallenge(id, uiversecss);
    }
  };

  const createFormData = (id:string ,img: string) => {
    const StartDate = date?.from ? format(date.from, "MMM dd, yyyy") : "";
    const EndDate = date?.to ? format(date.to, "MMM dd, yyyy") : "";
 
    return {
      id: id,
      title: title,
      sdesc: sdesc,
      description: desc,
      img: img,
      status: "Ongoing",
      date: {
        from: StartDate,
        to: EndDate,
      },
    };
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Create Challenges
      </Button>
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
                Enter Challenge Details
              </ModalHeader>
              <ModalBody>
                <div className='flex'>
                  <div className='w-[50%] m-[0.5rem]'>
                    <Input
                      isClearable={true}
                      placeholder='Enter Challenge Title'
                      label='Title'
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />{" "}
                  </div>

                  <div className='w-[50%] m-[0.5rem]'>
                    {" "}
                    <Input
                      isClearable={true}
                      placeholder='Enter Short Challenge Description'
                      label='Short Description'
                      value={sdesc}
                      onChange={(e) => {
                        setsdesc(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className='w-full m-[0.5rem]'>
                  <Textarea
                    label='Description'
                    placeholder='Enter Challenge Description'
                    className='max-w-3xl'
                    maxRows={3}
                    value={desc}
                    onChange={(e) => {
                      setdesc(e.target.value);
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
export default CreatechallengesModal;
function uploadToFirebase(file: any) {
  throw new Error("Function not implemented.");
}

