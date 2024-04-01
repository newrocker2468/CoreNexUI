import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import "../Styles/FormInput.css";
import { FC } from "react";
type Variant = "flat" | "bordered" | "underlined" | "faded";
interface PasswordInputProps {
  variant?: Variant;
  placeholder?: string;
  value: string;
  setvalue?: (value: string) => void;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PasswordInput: FC<PasswordInputProps> = ({
  name,
  onChange,
  value,
  setvalue,
  variant,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='my-input m-2'>
      <Input
        onChange={onChange}
        value={value}
        name={name}
        label='Password'
        variant={variant}
        placeholder={placeholder}
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
    </div>
  );
};
export default PasswordInput;