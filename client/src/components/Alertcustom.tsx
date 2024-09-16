
import { Terminal } from "lucide-react";
import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface AlertProps {
  message: string;
  isvisible: boolean;
  setIsvisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AlertCustom: FC<AlertProps> = ({ message, isvisible }) => {
  if (!isvisible) return <></>;
  return (
    <Alert style={{
width: "23rem",
border: "2px solid grey",
position:"relative"
    }} >
  

      <Terminal className='h-4 w-4' />
      <AlertTitle>Alert!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      {/* <CloseButton onClick={handleClose} style={{position:"absolute",right:"1rem",top:"1rem"}}/> */}
    </Alert>
  );
};
export default AlertCustom;