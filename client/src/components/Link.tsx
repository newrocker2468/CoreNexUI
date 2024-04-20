import { useLocation } from "react-router-dom";
import { Link as NextLink } from "@nextui-org/react";
import {
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {FC} from 'react';
interface LinkProps {
  href: string;
  children: React.ReactNode;
}


const Link:FC <LinkProps> = ({ href,children, ...props }) => {
  const location = useLocation();
  const isActive = href === location.pathname;

  return (
    <NavigationMenuLink asChild active={isActive}>
      <NextLink href={href} className='NavigationMenuLink' {...props} >
{children}
        </NextLink>
    </NavigationMenuLink>
  );
};

export default Link;