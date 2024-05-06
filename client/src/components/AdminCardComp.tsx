import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
// import csschallenge from  "../images/csschallenge.png";
import csschallenge from "../images/csschallenges.jpg";
import sheet from "../images/sheet.jpg";
import notes from "../images/notes.jpg";
import { Link } from "react-router-dom";
import permissions from "../images/permissions.jpg"
import challenges from "@/Icons/challeges.png";
export default function AdminCardcomp() {
  return (
    <div className='gap-2 grid grid-cols-12 grid-rows-2 px-8'>
      <Card isFooterBlurred className='col-span-12 sm:col-span-4 h-[300px]'>
        <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
          <p className='text-tiny uppercase font-bold text-white'>
            Approve Css Elements Posts
          </p>
          <h4 className='font-medium text-large text-white'>
            Approve or Reject Posts Made By Different
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
            <Image
              alt='Breathing app icon'
              className='rounded-full w-10 h-11 bg-black'
              src='/images/breathing-app-icon.jpeg'
            />
            <div className='flex flex-col'>
              <p className='text-tiny /60 text-white'>Try Now </p>
              <p className='text-tiny /60 text-white'>
                {/* Get a good night's sleep. */}
              </p>
            </div>
          </div>
          <Button radius='full' size='sm' color='primary'>
            <Link to='/admin/csselements/status' className='p-5'>
              Approve or Reject
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className='col-span-12 sm:col-span-4 h-[300px]'>
        <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
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
            <Image
              alt='Breathing app icon'
              className='rounded-full w-10 h-11 bg-black '
              src={`${challenges}`}
            />
            <div className='flex flex-col'>
              <p className='text-tiny text-white/60'>Breathing App</p>
              <p className='text-tiny text-white/60 '>
                Get a good night's sleep.
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
        <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
          <p className='text-tiny /60 uppercase font-bold'>
            Attendance Management
          </p>
          <h4 className=' font-medium text-large'>
            Upload Attendance Sheets to Manage Attendance{" "}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 w-full h-full object-cover'
          src={`${sheet}`}
        />
        {/* <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'> */}
        <CardFooter className='absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between'>
          <div className='flex flex-grow gap-2 items-center'>
            <Image
              alt='Breathing app icon'
              className='rounded-full w-10 h-11 bg-black'
              src='/images/breathing-app-icon.jpeg'
            />
            <div className='flex flex-col'>
              <p className='text-tiny text-black'>Breathing App</p>
              <p className='text-tiny text-black'>Get a good night's sleep.</p>
            </div>
          </div>
          <Button radius='full' size='sm'>
            <Link to='/admin/uploadattendance'>Upload Attendance Sheet</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card
        isFooterBlurred
        className='w-full h-[300px] col-span-12 sm:col-span-5'
      >
        <CardHeader className='absolute z-10 top-1 flex-col items-start'>
          <p className='text-tiny /60 uppercase font-bold'>New</p>
          <h4 className='font-medium text-2xl bg-black '>
            Assign Permissions to users or other admins
          </h4>
        </CardHeader>

        <Image
          removeWrapper
          alt='Card example background'
          className='z-0 w-full h-full scale-125 -translate-y-6 object-cover'
          src={`${permissions}`}
        />
        <CardFooter className='absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between'>
          <div>
            <p className='text-black text-tiny'>Manage Users Permissions</p>
            <p className='text-black text-tiny'>Have Full Control </p>
          </div>
          <Button className='text-tiny' color='primary' radius='full' size='sm'>
            <Link to='/admin/managepermissions'>Manage</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card
        isFooterBlurred
        className='w-full h-[300px] col-span-12 sm:col-span-7'
      >
        <CardHeader className='absolute z-10 top-1 flex-col items-start'>
          <p className='text-tiny /60 uppercase font-bold'> EVENT MANAGEMENT</p>
          <h4 className='/90 font-medium text-xl'>
            Manage Events and Get Notified Upload Attendance Sheets to Manage
            Attendance
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Relaxing app background'
          className='z-0 w-full h-full object-cover'
          src='https://imgs.search.brave.com/TzfIPQmwAgCR8-dovLUVhC4rU77I5eYwsMmamd0y0zM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aW1lb3V0LmNv/bS9pbWFnZXMvMTAw/NzI0NDE5Lzc1MC80/MjIvaW1hZ2UuanBn'
        />
        <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
          <div className='flex flex-grow gap-2 items-center'>
            <Image
              alt='Breathing app icon'
              className='rounded-full w-10 h-11 bg-black'
              src='/images/breathing-app-icon.jpeg'
            />
            <div className='flex flex-col'>
              <p className='text-tiny /60'></p>
              <p className='text-tiny /60'></p>
            </div>
          </div>
          <Button className='text-tiny' color='primary' radius='full' size='sm'>
            <Link to='/event'>Manage Events</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
