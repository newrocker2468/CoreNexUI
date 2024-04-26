import uiversecss from "@/images/uiversecss2.jpg";
import "@/Styles/Card.css";
import { FC, useState } from "react";
import { useHover } from "@react-aria/interactions";
import whitetick from "@/Icons/check.png";
import blacktick from "@/Icons/blackcheck.png";
import { useTheme } from "./theme-provider";
import { Link } from "react-router-dom";
import { DateRange } from "react-day-picker";
interface CsscardProps {
  id?: string;
  title?: string;
  description?: string;
  sdesc?: string;
  img?: string;
  status?: string;
  sdate?: string;
  edate?: string;
}

const Csscard: FC<CsscardProps> = ({id, title, description,sdesc, img, status,sdate,edate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { hoverProps } = useHover({
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
  });
  const calculateStatus = (sdate, edate) => {
    const currentDate = new Date();
    const startDate = new Date(sdate);
    const endDate = new Date(edate);

    if (currentDate < startDate) {
      const diffInDays = Math.ceil(
        (startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffInDays + " days left";
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return "Ongoing";
    } else if (currentDate > endDate) {
      return "Finished";
    }
  };

  

  const { theme } = useTheme();
  // console.log(theme);
  return (
    <>
      <div
        className={`m-4 card  h-[50vh] w-[78vw] card border relative overflow-hidden cursor-pointer flex  justify-between m-auto `}
        {...hoverProps}
      >
        <div
          className={`ml-[2.5rem] flex overflow-hidden flex-col justify-evenly align-center card_desc relative min-w-[30%] max-w-[40%]`}
        >
          <p
            className={`relative rounded-lg m-1 font-bold w-[7rem] ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <img
              src={theme === "dark" ? whitetick : blacktick}
              alt=''
              className='inline'
              width={"25rem"}
            />
            <span className='mr-1.5'> {calculateStatus(sdate, edate)}</span>
          </p>

          <div>
            <h2 className='font-bold text-[2.25rem]'>
              {title || "Card Title"}
            </h2>
            <h3 className='font-italic'>{sdesc || "Short Description"}</h3>
          </div>
          <p className='text-left'>{description || "Card Description"}</p>
          <div className='flex justify-start'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            >
              <path d='M8 2v2.128M8 6V4.128M16 2v2.128M16 6V4.128M20.96 10c.04.788.04 1.755.04 3 0 2.796 0 4.194-.457 5.296a6 6 0 0 1-3.247 3.247C16.194 22 14.796 22 12 22c-2.796 0-4.193 0-5.296-.457a6 6 0 0 1-3.247-3.247C3 17.194 3 15.796 3 13c0-1.245 0-2.212.04-3m17.92 0c-.05-.982-.163-1.684-.417-2.296a6 6 0 0 0-3.247-3.247A5.136 5.136 0 0 0 16 4.127M20.96 10H3.04m0 0c.05-.982.163-1.684.417-2.296a6 6 0 0 1 3.247-3.247A5.135 5.135 0 0 1 8 4.127m0 0C8.941 4 10.172 4 12 4c1.828 0 3.059 0 4 .128'></path>
            </svg>
            {/* <span className='mx-3 font-bold'>{sdate}</span> */}
            <span className='mx-3 font-bold'>{edate}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              className='w-5 h-5'
            >
              <path fill='none' d='M0 0h24v24H0z'></path>
              <path
                fill='currentColor'
                d='M2 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm8.284 3.703A8.002 8.002 0 0 1 23 22h-2a6.001 6.001 0 0 0-3.537-5.473l.82-1.824zm-.688-11.29A5.5 5.5 0 0 1 21 8.5a5.499 5.499 0 0 1-5 5.478v-2.013a3.5 3.5 0 0 0 1.041-6.609l.555-1.943z'
              ></path>
            </svg>
            <span className='ml-3'>45</span>
          </div>
        </div>

        <div
          className={`card_div max-w-xl  ${
            theme === "dark" ? "card_img_dark" : "card_img_light"
          }`}
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <img src={img} alt='img' className={`card_img max-w-xl`} />
        </div>
      </div>
    </>
  );
};
export default Csscard;
