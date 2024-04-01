import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LoginWithEmail() {
  return (
    <Button>
      <Mail className='mr-2 h-4 w-4' /> Login
    </Button>
  );
}
