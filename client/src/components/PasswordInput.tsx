/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import "../Styles/FormInput.css";
import ErrorMessage from "./ErrorMessage";
import { FC } from "react";
import LockIcon from "../Icons/LockIcon";
type Variant = "flat" | "bordered" | "underlined" | "faded";
type Errors = {
  email?: string;
  password?: string;
  repassword?: string;
};
interface PasswordInputProps {
  variant?: Variant;
  placeholder?: string;
  value: string;
  setvalue?: (value: string) => void;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | undefined;
  errors: Errors;
  isInvalid: boolean;
}
const PasswordInput: FC<PasswordInputProps> = ({
  name,
  onChange,
  variant,
  placeholder,
  validate,
  errors,
  isInvalid,
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className='my-input m-2'>
      <Input
        onChange={onChange}
        // value={value}
        isInvalid={isInvalid}
        name={name}
        label='Password'
        variant={variant}
        placeholder={placeholder}
        validate={validate}
        startContent={
          <LockIcon className='text-xl text-default-400 pointer-events-none flex-shrink-0' />
        }
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className='fullWidth'
      />
      {errors && (
        <>
   
     <ErrorMessage errors={errors} name={name}/>
        </>
      )}
    </div>
  );
};
export default PasswordInput;