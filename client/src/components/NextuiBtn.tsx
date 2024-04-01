
import { User } from "@nextui-org/react";
import {FC} from 'react';

interface NextuiBtnProps {
    name: string;
    description?: string;
image?: string;
}

 const NextuiBtn: FC<NextuiBtnProps> = ({ name, description, image }) => {
   return (
     <User
       name={name}
       description={description}
       avatarProps={{
         src: `${image}`,
       }}
     />
   );
 };
export default NextuiBtn;