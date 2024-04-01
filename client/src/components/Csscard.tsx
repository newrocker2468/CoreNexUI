import uiversecss from "@/images/uiversecss2.jpg";
import "@/Styles/Card.css"
import {FC,useState} from 'react';
import { useHover } from "@react-aria/interactions";
interface CsscardProps {
    title : string;
    description : string;
    img : string;
}

const Csscard:FC<CsscardProps>= ({title,description,img}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { hoverProps } = useHover({
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
  });
  console.log(isHovered);
    return (
  
        <div className='card' {...hoverProps}>
          <div className='card_desc'>
            <h2>{title || "Card Title"}</h2>
            <p>{description || "Card Description"}</p>
          </div>
          <div className='card_img'>
            <img
              src={`${uiversecss}` || img}
              alt='img'
              className='card_img'
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>
        </div>

    );
}
export default Csscard;