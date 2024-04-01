import { FC } from "react";

interface LogoProps {
  fill: string;
  width:string;
}

 const Logo: FC<LogoProps> = ({ fill, width }) => {
   return (
     <>
       <svg
         xmlns='http://www.w3.org/2000/svg'
         xmlnsXlink='http://www.w3.org/1999/xlink'
         viewBox='0 0 100 100'
         version='1.1'
         x='0px'
         y='0px'
         width={width}
       >
         <title>univer</title>
         <desc>Created with Sketch.</desc>
         <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
           {/* <g fill='#000000'></g> */}
           <g fill={fill}>
             <path d='M14.0393881,64.3761667 C21.793128,64.3761667 28.0787761,58.079644 28.0787761,50.3124898 C28.0787761,42.5453355 21.793128,36.2488129 14.0393881,36.2488129 C6.28564814,36.2488129 0,42.5453355 0,50.3124898 C0,58.079644 6.28564814,64.3761667 14.0393881,64.3761667 L14.0393881,64.3761667 Z M63.6378162,86.2428509 C63.4750358,93.8684628 57.2531783,100 49.6016969,100 C41.847957,100 35.5623088,93.7034774 35.5623088,85.9363231 C35.5623088,78.1691688 41.847957,71.8726462 49.6016969,71.8726462 C49.6206766,71.8726462 49.6401891,71.8721699 49.6602289,71.8712221 C49.7440442,71.8721707 49.8279728,71.8726462 49.9120124,71.8726462 C61.8379609,71.8726462 71.5309458,62.2956523 71.744906,50.4002616 C71.7473077,50.3698059 71.7485178,50.3405426 71.7485178,50.3124898 C71.7485178,50.2937213 71.7480268,50.2744306 71.7470501,50.2546229 C71.7480277,50.1693192 71.7485178,50.0838983 71.7485178,49.9983626 C71.7485178,37.9175293 61.9719813,28.124079 49.9120124,28.124079 C49.7872633,28.124079 49.6627586,28.1251269 49.5385065,28.1272143 C41.8138351,28.0931155 35.5623088,21.8097204 35.5623088,14.0636769 C35.5623088,6.29652262 41.847957,0 49.6016969,0 C57.3343625,0 63.6069058,6.26234175 63.6409457,14.0003772 C63.6388619,14.1248442 63.6378158,14.2495644 63.6378158,14.3745292 C63.6378158,26.4553625 73.4143523,36.2488129 85.4743212,36.2488129 C85.5579657,36.2488129 85.6415004,36.2483418 85.7249228,36.2474021 C85.7464162,36.2483409 85.7674123,36.2488129 85.7879058,36.2488129 C93.5416458,36.2488129 99.8272939,42.5453355 99.8272939,50.3124898 C99.8272939,58.0594025 93.5743645,64.3433386 85.8484957,64.3760385 C85.7240216,64.3739435 85.599294,64.3728918 85.4743212,64.3728918 C73.4157913,64.3728918 63.640149,74.1640051 63.6378162,86.2428509 L63.6378162,86.2428509 L63.6378162,86.2428509 Z'></path>
           </g>
         </g>
       </svg>
     </>
   );
 };
export default Logo;