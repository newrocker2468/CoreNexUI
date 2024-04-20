import { Image } from "@nextui-org/react";
import { FC } from "react";
interface AnimatedLoadingProps {
    img?: string;
    width?: number;
    height?: number;
}
const AnimatedLoading: FC<AnimatedLoadingProps> = ({ img, width ,height}) => {
  return (
    <Image
      width={width || 300}
      height={height || 200}
      alt='NextUI hero Image with delay'
      src={
        img ||
        "https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      }
    />
  );
};
export default AnimatedLoading;