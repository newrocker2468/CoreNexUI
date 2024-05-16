import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {FC} from 'react';
interface Props { 
  onClick?: () => void;
}
const LoginWithEmail:FC<Props>= ({ onClick }) =>{
  return (
    <Button>
      <Mail className='mr-2 h-4 w-4' onClick={onClick}/> Login
    </Button>
  );
}
export default LoginWithEmail;
