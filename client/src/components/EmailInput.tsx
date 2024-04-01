import { Input } from "@nextui-org/react";
import "../Styles/FormInput.css";
import { FC } from "react";
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
}

const EmailInput: FC<EmailInputProps> = ({
  variant,
  value,
  name,
  onChange,
  id,
  validate,
  errors,
}) => {
  // const variants = ["flat", "bordered", "underlined", "faded"];
console.log(errors)
  return (
    <div style={{ margin: 10 }} className='my-input'>
      <Input
        onChange={onChange}
        value={value}
        isClearable={true}
        type='email'
        variant={variant}
        label='Email'
        placeholder='Enter your email'
        name={name}
        id={id}
        validate={validate}
      />
     {errors && errors.email && <p className='text-red-500'>{errors.email}</p>}
    </div>
  );
};

export default EmailInput;
