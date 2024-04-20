import { AlertCircle } from "lucide-react";
import {FC} from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface ErrorAlertProps {
    title: string;
    description: string;
}
const  ErrorAlert:FC <ErrorAlertProps> = ({title,description}) => {
  
  return (
    
      <Alert variant='destructive' className='w-[25rem] h-[4rem]'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
  );
}

export default ErrorAlert;
