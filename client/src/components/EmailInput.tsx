import { AlertCircle } from "lucide-react";
import { Input } from "@nextui-org/react";
import "../Styles/FormInput.css";
import { FC } from "react";
import MailIcon from "../Icons/MailIcon";
import ErrorAlert from "./ErrorAlert";
import ErrorMessage from "./ErrorMessage";
type Errors = {
  email?: string;
  password?: string;
};
type Variant = "flat" | "bordered" | "underlined" | "faded";
interface EmailInputProps {
  variant: Variant;
  value: string;
  setvalue?: (value: string) => void;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  validate?: (value: string) => string | undefined;
  errors: Errors;
  isInvalid: boolean;
}

const EmailInput: FC<EmailInputProps> = ({
  variant,
  value,
  name,
  onChange,
  id,
  validate,
  errors,
  isInvalid,
}) => {
  // const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div style={{ margin: 10 }} className='my-input'>
      <Input
        onChange={onChange}
        // value={value}
        isClearable={true}
        type='email'
        variant={variant}
        label='Email'
        placeholder='Enter your email'
        name={name}
        isInvalid={isInvalid}
        id={id}
        validate={validate}
        startContent={
          <MailIcon className='text-xl text-default-400 pointer-events-none flex-shrink-0' />
        }
      />
      {errors.email && (
        <>
  <ErrorMessage errors={errors} name={`${name}`}/>
        </>
      )}
      {/* {errors && errors.email && (
        <ErrorAlert title='Opps! Error' description={errors.email} />
      )} */}
    </div>
  );
};

export default EmailInput;
