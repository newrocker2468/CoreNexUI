
import { Link as NextLink } from "@nextui-org/react";
import "../Styles/AnchorLink.css";
import { FC } from "react";

interface AnchorLinkProps {
  text: string;
  astyles: string;
  to: string;
}


const AnchorLink: FC<AnchorLinkProps> = ({ text, astyles, to }) => {
  return (
    <div className='flex gap-4'>
      <NextLink className={astyles} href={to}>
        {text}
      </NextLink>
    </div>
  );
};

export default AnchorLink;