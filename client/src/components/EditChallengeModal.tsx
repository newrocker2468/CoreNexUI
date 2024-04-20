
import "@/Styles/CssChallengeDescription.css";
import { ChangeEvent, FC, useEffect, useState } from "react";
import React, { Dispatch, SetStateAction } from "react";

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
interface Challenge1 {
  id: string | undefined;
  title: string | undefined;
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

const EditChallengeModal: FC<EditProps> = ({
  Cssdata,
  setCssdata,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [id, setid] = useState(`${Cssdata?.id}`);

  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
    // from: new Date(2022, 0, 20),
    // to: addDays(new Date(2022, 0, 20), 20),
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
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
const uploadToFirebase = (
  file: Blob | Uint8Array | ArrayBuffer,
  name:string,
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
    fetch(`http://localhost:3000/csschallengesupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createFormData(id, displayImage)),
    }).then((response) => {
      console.log("responseeeeeeeeeeeeeeeeeeeeeeeeee");
    toast.success("Css Challenge Updated Successfully !", {
      duration: 2500,
      position: "top-center",
      action: {
        label: "X",
        onClick: () => console.log("Action"),
      },
    });
      console.log(response);
    });
    // setFlag(!flag);
  };

  const SubmitHandler = () => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = async() => {
        // const displayImage = reader.result as string;
        const file = files[0];
        const name = file.name;
        console.log(name);
         const imageUrl = await uploadToFirebase(file,name); // assuming this returns a Promise that resolves with the image URL
         const formdata = createFormData(id, imageUrl);
        setCssdata({ ...Cssdata, ...formdata });
        CreateChallenge(id, imageUrl);
        setFiles([]);
      };
      reader.readAsDataURL(files[0]);
    } else {
      const formdata = createFormData(id, uiversecss);
      setCssdata({ ...Cssdata, ...formdata });
      CreateChallenge(id, uiversecss);
    }
  };

  const createFormData = (id: string, img: string) => {
    const StartDate = date?.from ? format(date.from, "MMM dd, yyyy") : "";
    const EndDate = date?.to ? format(date.to, "MMM dd, yyyy") : "";

    return {
      id: Cssdata?.id,
      title: Cssdata?.title,
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
                Enter Challenge Details
              </ModalHeader>
              <ModalBody>
                <div className='flex'>
                  <div className='w-[50%] m-[0.5rem]'>
                    <Input
                      placeholder='Enter Challenge Title'
                      label='Title'
                      value={Cssdata.title}
                      onChange={(e) => {
                        setCssdata({
                          ...Cssdata,
                          title: e.target.value,
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
                    placeholder='Enter Challenge Description'
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
export default EditChallengeModal;