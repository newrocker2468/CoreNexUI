import { Checkbox } from "@nextui-org/react";
import {FC} from 'react'
type Errors = {
  email?: string;
  password?: string;
  repassword?: string;
  terms?: string;
};
interface CheckBoxProps {
  text: string;
  boxstyles?: string;
  isInvalid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Errors;
  name?: string;
}

 const CheckBox: FC<CheckBoxProps> = ({
   text,
   boxstyles,
   isInvalid,
   onChange,
   name
 }) => {
   return (
     <Checkbox
       defaultChecked
       className={`${boxstyles}`}
       isInvalid={isInvalid}
       onChange={onChange}
       name={name}
     >
       {text}
     </Checkbox>
   );
 };
export default CheckBox