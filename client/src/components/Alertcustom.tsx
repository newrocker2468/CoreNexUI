// import {
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   CloseButton,
// } from "@chakra-ui/react";
// import {FC} from 'react'
// import { Progress } from "@nextui-org/react";

// interface AlertProps {
// message:string;
// isvisible:boolean;
// setIsvisible:React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Alertcustom: FC<AlertProps> = ({ message, isvisible, setIsvisible }) => {
//   if (!isvisible) return <></>;
// const handleClose = () => {
//   setIsvisible(false);
// }
//   return (
//     <>
//       <div className="flex justify">
//         <Alert
//           status='success'
//           variant='top-accent'
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//             width: "20rem",
//             backgroundColor: "green",
//             padding: "0.5rem",
//             margin: "1rem",
//           }}
//         >
   
//           <AlertIcon style={{ width: "2rem", color: "lightgreen" }} />
//           <span style={{ marginLeft: -25 }}>{message}</span>
//           <span className=''>
//             <CloseButton onClick={handleClose} />
//           </span>
//         </Alert>
//       </div>
//     </>
//   );
// };
// export default Alertcustom;
import {CloseButton,} from "@chakra-ui/react";
import { Terminal } from "lucide-react";
import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface AlertProps {
  message: string;
  isvisible: boolean;
  setIsvisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AlertCustom: FC<AlertProps> = ({ message, isvisible, setIsvisible }) => {
  if (!isvisible) return <></>;
  const handleClose = () => {
    setIsvisible(false);
  };
  return (
    <Alert style={{
width: "23rem",
border: "2px solid grey",
position:"relative"
    }} >
  

      <Terminal className='h-4 w-4' />
      <AlertTitle>Alert!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton onClick={handleClose} style={{position:"absolute",right:"1rem",top:"1rem"}}/>
    </Alert>
  );
};
export default AlertCustom;