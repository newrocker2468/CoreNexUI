import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
// import csschallenge from  "../images/csschallenge.png";
import csschallenge from "../images/csschallenges.jpg";
import notes from "../images/notes.jpg";
import { Link } from "react-router-dom";
// import challenges from "@/Icons/challeges.png";
export default function Cardcomp() {
  return (
    <div className='gap-2 grid grid-cols-12 grid-rows-2 px-8'>
      <Card isFooterBlurred className='col-span-12 sm:col-span-4 h-[300px]'>
        <CardHeader className='absolute z-10 flex-col !items-start bg-grey bg-opacity-50'>
          <p className='text-tiny uppercase font-bold text-white'>
            Css Elements
          </p>
          <h4 className='font-medium text-large text-white'>
            Access Elements Made By all Diff Developers
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 w-full h-full object-cover'
          src='https://cdn.dribbble.com/users/427857/screenshots/15480205/media/95d23dc84e5009e7b67c21383eddaf53.png?compress=1&resize=400x300'
        />
        <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
          <div className='flex flex-grow gap-2 items-center'>
            <div className='flex flex-col'>
              <p className='text-tiny /60 text-white'>Try Now </p>
              <p className='text-tiny /60 text-white'>
                {/* Get a good night's sleep. */}
              </p>
            </div>
          </div>
          <Button radius='full' size='sm' color='primary'>
            <Link to='/Csselements' className='p-5'>
              Try
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className='col-span-12 sm:col-span-4 h-[300px]'>
        <CardHeader className='absolute z-10 flex-col !items-start bg-grey bg-opacity-50'>
          <p className='text-tiny /60 uppercase font-bold text-white'>
            Css Challenges
          </p>
          <h4 className=' font-medium text-large text-white'>
            Compete With Other Css Developer{" "}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 w-full h-full object-cover '
          src={`${csschallenge}`}
        />
        <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 '>
          <div className='flex flex-grow gap-2 items-center'>
            <div className='flex flex-col'>
              <p className='text-tiny text-white/60'>Think Your Are Good?</p>
              <p className='text-tiny text-white/60 '>
                Compete With Other Developers
              </p>
            </div>
          </div>{" "}
          <Button
            className='text-tiny font-bold p-0 min-w-0 min-h-0'
            color='primary'
            radius='full'
            size='sm'
          >
            <Link to='/Csschallenges' className='p-5'>
              Visit
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className='col-span-12 sm:col-span-4 h-[300px]'>
        <CardHeader className='absolute z-10 bg-grey bg-opacity-50 flex-col !items-start'>
          <p className='text-tiny /60 uppercase font-bold text-white'>
            User Guide
          </p>
          <h4 className=' font-medium text-large text-white'>
          Refer Guide For Creating Elements
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 w-full h-full object-cover'
          src={`https://img.freepik.com/free-photo/female-web-designer-office-with-notebook_23-2149749870.jpg?t=st=1715778337~exp=1715781937~hmac=9d09b7673e6604167832b5f657682e4b60abcd8363070c1cabc6dd98c29de223&w=1060`}
        />
        {/* <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'> */}
        <CardFooter className='absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between'>
          <div className='flex flex-grow gap-2 items-center'>
            <div className='flex flex-col'>
              <p className='text-tiny text-black'>Detailed User Guide</p>
            </div>
          </div>
          <Button
            className='text-tiny font-bold p-0 min-w-0 min-h-0'
            color='primary'
            radius='full'
            size='sm'
          >
            <Link to='/docs' className='p-5'>
              Check Out
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card
        isFooterBlurred
        className='w-full h-[300px] col-span-12 sm:col-span-5'
      >
        <CardHeader className='absolute z-10 bg-grey bg-opacity-50 flex-col items-start'>
          <p className='text-tiny /60 uppercase font-bold text-white'>New</p>
          <h4 className='font-medium text-2xl text-white'>Upload Notes</h4>
        </CardHeader>

        <Image
          removeWrapper
          alt='Card example background'
          className='z-0 w-full h-full scale-125 -translate-y-6 object-cover'
          src={`${notes}`}
        />
        <CardFooter className='absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between'>
          <div>
            <p className='text-black text-tiny'>Upload your notes here</p>
            <p className='text-black text-tiny'>
              Capture Upload and Good to Go!
            </p>
          </div>
          <Button
            className='text-tiny font-bold p-0 min-w-0 min-h-0'
            color='primary'
            radius='full'
            size='sm'
          >
            <Link to='/notes/upload' className='p-5'>
              Check Out
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card
        isFooterBlurred
        className='w-full h-[300px] col-span-12 sm:col-span-7'
      >
        <CardHeader className='absolute z-10 bg-grey bg-opacity-50 flex-col items-start'>
          <p className='text-tiny /60 uppercase font-bold  text-white'>
            {" "}
            EVENT MANAGEMENT
          </p>
          <h4 className='/90 font-medium text-xl text-white'>Manage Events</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Relaxing app background'
          className='z-0 w-full h-full object-cover'
          src='https://imgs.search.brave.com/TzfIPQmwAgCR8-dovLUVhC4rU77I5eYwsMmamd0y0zM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aW1lb3V0LmNv/bS9pbWFnZXMvMTAw/NzI0NDE5Lzc1MC80/MjIvaW1hZ2UuanBn'
        />
        <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
          <div className='flex flex-grow gap-2 items-center'>
            <div className='flex flex-col'>
              <p className='text-tiny /60 text-white'>Event Management</p>
              <p className='text-tiny /60 text-white'>Made easy</p>
            </div>
          </div>
          <Button
            className='text-tiny font-bold p-0 min-w-0 min-h-0'
            color='primary'
            radius='full'
            size='sm'
          >
            <Link to='/event' className='p-5'>
              Event-Section
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
