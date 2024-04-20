import { AlertCircle } from "lucide-react";
import { FC } from "react";
type Errors = {
  email?: string;
  password?: string;
  repassword?: string;
  [key: string]: string | undefined;
};
interface ErrorMessageProps {
  errors: Errors;
  name: string;
}
const ErrorMessage:FC<ErrorMessageProps> = ({ errors, name }) =>
  errors[name] && (
    <>
      <p className='font-bold text-red-500 flex justify-center align center m-2'>
        <AlertCircle className='h-5 w-4 mt-[0.09rem] mx-1' />
        {errors[name]}
      </p>
    </>
  );
export default ErrorMessage;