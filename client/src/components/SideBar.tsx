import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className='SideBar bg-grey w-[15rem] h-screen overflow-y-auto'>
      <div className='SideLinks flex flex-col ml-[2rem] justify-center align-center'>
        <Link to='/home' className='m-3 text-center'>
          Home
        </Link>
        <Link to='/login' className='m-3 text-center'>
          Login
        </Link>
        <Link to='/signup' className='m-3 text-center'>
          Sign Up
        </Link>
        <Link to='/about' className='m-3 text-center'>
          About
        </Link>
        <Link to='/contact' className='m-3 text-center'>
          Contact
        </Link>
        <Link to='/home' className='m-3 text-center'>
          Home
        </Link>
        <Link to='/login' className='m-3'>
          Login
        </Link>
        <Link to='/signup' className='m-3'>
          Sign Up
        </Link>
        <Link to='/about' className='m-3'>
          About
        </Link>
        <Link to='/contact' className='m-3'>
          Contact
        </Link>
        <Link to='/home' className='m-3'>
          Home
        </Link>
        <Link to='/login' className='m-3'>
          Login
        </Link>
        <Link to='/signup' className='m-3'>
          Sign Up
        </Link>
        <Link to='/about' className='m-3'>
          About
        </Link>
        <Link to='/contact' className='m-3'>
          Contact
        </Link>
        <Link to='/home' className='m-3'>
          Home
        </Link>
        <Link to='/login' className='m-3'>
          Login
        </Link>
        <Link to='/signup' className='m-3'>
          Sign Up
        </Link>
        <Link to='/about' className='m-3'>
          About
        </Link>
        <Link to='/contact' className='m-3'>
          Contact
        </Link>
      </div>
    </div>
  );
}
