/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@nextui-org/react";
import { Input as Shdcninput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Btn from "./Btn";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import axios from "axios";
import FileList from "./FileList";

interface MyFile {
  _id: string;
  path: string;
  filename: string;
  size: number;
  mimetype: string;
  uploadDate: string;
  user: string;
 
}
// type FileListProps = {
//   files: MyFile[];
//   // other props
// };
export default function NotesUploadComp() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
  };

  initializeApp(firebaseConfig);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderName, setFolderName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<MyFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  }; const handleUpload = async () => {
    if (selectedFiles) {
      const storage = getStorage();
      const promises = Array.from(selectedFiles).map((file) => {
        const storageRef = ref(storage, `${folderName}/${file.name}`);
        return uploadBytes(storageRef, file as Blob).then(() => {
          // Get the download URL
          return getDownloadURL(storageRef);
        });
      });

      const urls = await Promise.all(promises);
      console.log(urls); // Array of download URLs

      // Call your API to save the URLs in your database
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/files`,
          {
            files: urls.map((url, index) => ({
              filename: selectedFiles[index].name,
              mimetype: selectedFiles[index].type,
              path: url,
              size: selectedFiles[index].size, // Add the file size here
              folder: folderName,
            })),
          },
          { withCredentials: true }
        )
        .then((response) => {
          // Update the list of uploaded files
          setUploadedFiles([...uploadedFiles, ...response.data]);
        });
    }
  };
 useEffect(() => {
   // Fetch the list of uploaded files from your backend
   axios
     .get(`${import.meta.env.VITE_BASE_URL}/files`, {
       withCredentials: true,
     })
     .then((response) => {
       console.log(response.data);
       setUploadedFiles(response.data);
       setIsLoading(false); // Set loading to false after the data has loaded
     });
 }, []);

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  return (
    <>
      <div className='flex  flex-wrap md:flex-nowrap gap-4 w-[26rem] m-5'>
        Enter folder name
        <Input
          type='text'
          label='Folder Name'
          placeholder='Enter your FolderName'
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>
      <Label htmlFor='picture'>Picture</Label>
      <Shdcninput
        id='picture'
        type='file'
        className='w-[20rem]'
        onChange={handleFileChange}
        multiple
      />
      <Btn Text='Upload' color='primary' onClick={handleUpload}></Btn>

      <div>
        <h2>Uploaded Files</h2>
        {isLoading ? (
          <p>Loading...</p> // Show a loading message while the data is loading
        ) : (
          <FileList files={uploadedFiles} setFiles={setUploadedFiles}/>
        )}
      </div>
    </>
  );
}
