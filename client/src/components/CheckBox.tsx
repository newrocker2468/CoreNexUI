import { Checkbox } from "@nextui-org/react";
import {FC} from 'react'
interface CheckBoxProps {
  text: string;
  boxstyles?: string;
}

 const CheckBox:FC<CheckBoxProps> = ({text,boxstyles}) =>{
  return (
    <Checkbox defaultChecked className={`${boxstyles}`}>
       {text}
    </Checkbox>
  );
}
export default CheckBox