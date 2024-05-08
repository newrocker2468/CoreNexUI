/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent } from "react";
declare module "lucide-react" {
  export const Moon: FunctionComponent;
  export const Sun: FunctionComponent;
}


declare global {
  interface Window {
    monaco: any;
  }
}

declare module "components/NavTest" {
  const NavTest: FunctionComponent; 
  export default NavTest;
}

