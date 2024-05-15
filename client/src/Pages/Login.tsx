/* eslint-disable @typescript-eslint/no-unused-vars */

import "../Styles/Login.css";
// import RandomQuoteGenerator from "@/middlewares/RandomQuoteGenerator";
import { useState, useContext } from "react";
import EmailInput from "@/components/EmailInput.tsx";
import "../output.css";
import Btn from "@/components/Btn";
import GithubIcon from "@/Icons/github-mark-white.svg";
import GoogleIcon from "@/Icons/GoogleIcon.svg";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
import AnchorLink from "@/components/AnchorLink";
import { useNavigate } from "react-router-dom";
import Alertcustom from "@/components/Alertcustom.tsx";
import { useFormik } from "formik";
import AnimatedCode from "@/components/AnimatedCode";
import UserContext from "@/components/UserContext";
import axios from "axios";
import { toast } from "sonner";


type FormikValues = {
  email: string;
  password: string;
  Remember: boolean;
};

 function validateEmail(value: FormikValues["email"]) {
   let error;
   if (!value) {
     error = "Required";
   } else if (
     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
     (value.match(/\./g) || []).length >= 2
   ) {
 
     error = "Invalid email address";
   }
   return error;
 }

 function validatePassword(value: FormikValues["password"]){
   let error;
   if (!value) {
     error = "Required";
   } 
   else if (value.length < 8) {
     error = "Password must be atleast 8 characters long";
   }
  //  else if (!/(?=.*[0-9])/.test(value)) {
  //    error = "Password must contain a number";
  //  }
  //   else if (!/(?=.*[a-z])/.test(value)) {
  //     error = "Password must contain a lowercase letter";
  //   }
  //   else if (!/(?=.*[A-Z])/.test(value)) {
  //     error = "Password must contain an uppercase letter";
  //   }
  //   else if (!/(?=.*[!@#$%^&*])/.test(value)) {
  //     error = "Password must contain a special character";
  //   }

   return error;
 }


export default function Login() {
    const { setUser } = useContext(UserContext);
    const [Remember] = useState(false);
 const formik = useFormik({
   initialValues: {
     email: "",
     password: "",
     Remember: false,
   },
   onSubmit: (values) => {
 try {
   setLoading(true);
   axios
     .post(
       `${import.meta.env.VITE_BASE_URL}/login`,
       {
         email: values.email,
         password: values.password,
         remember: Remember,
       },
       { withCredentials: true }
     )
     .then((response) => {
    
       if (response.data.error) {
         toast.error(response.data.message, {
           position: "top-center",
         });
       }
       if (response.data.signup) {
         toast.error(response.data.message, {
           position: "top-center",
         });
         navigate("/signup");
       }
       if (response.data.user) {
         console.log(response.data.user.email);
         setUser((prevState) => ({
           ...prevState,
           isLoggedIn: true,
           email: response.data.user.email,
           Permissions: response.data.user.Permissions,
         }));
         console.log(response.data.newUser);
         toast.success(response.data.message, {
           position: "top-center",
         });
         navigate("/home");
       }
     });
 } catch (err) {
          console.log(err);

 }finally{
setTimeout(() => {
  setLoading(false);
}, 1000);
 }
   
 
    //  alert(JSON.stringify(values, null, 2));
    //  console.log(values);
     
    // fetch("http://localhost:3000/home", {
      
    // method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({ email: values.email }),
    
    // })
    // .then(async (data) => {
    //   setLoading(true);
    //   const response = await data.json();
    //   setTimeout(() => {
    //     console.log(response.message);
    //     setResponse(response.message);
    //     setLoading(false);
    //     navigate("/signup");
    //   }, 2000);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   setResponse("An error occured");
    //   setIsvisible(true);
    // });
   
  },validate: values => {
    const errors: { email?: string; password?: string } = {};
    const emailError = validateEmail(values.email); // assuming this returns an error message or null
    const passwordError = validatePassword(values.password); // assuming this returns an error message or null

    if (emailError) {
      errors.email = emailError;
          setEmailisInvalid(true);
          return errors;
    }
else{
    setEmailisInvalid(false);
}
    if (passwordError) {
      errors.password = passwordError;
      setPassisInvalid(true);
      return errors;
    }
else{
     setPassisInvalid(false);
}
    return errors;
    
   },
 });


const loginwithgoogle = async () => {

 try {

  axios.post(
    `${import.meta.env.VITE_BASE_URL}/login/save`,
    {
      email: formik.values.email,
      password: formik.values.password,
      remember: formik.values.Remember,
    },
    { withCredentials: true }
  );


  
   const response = await axios.get(
     `${import.meta.env.VITE_BASE_URL}/validate-token`,
     {
       withCredentials: true,
     }
   );
   const user = response.data.user;
         const name = user.google.displayName; 
          console.log("validate-token response:", response);
      if (name) {
        const profile = user["google"];
        let highres_img = profile.image;
        if (profile.image.includes("s96-c")) {
          highres_img = profile.image.replace("s96-c", "s500-c");
        } else if (profile.image.includes("sz=50")) {
          highres_img = profile.image.replace("sz=50", "sz=240");
        }
        console.log(user);
        setUser((prevState) => ({
          ...prevState,
          userName: profile.displayName,
          avatarProps: profile.image,
          highres_img: highres_img,
          isLoggedIn: true,
          email: user.email!,
          bio: profile.bio,
          Permissions: user.Permissions,
        }));
        navigate("/home");
      }
      else{
        if (Remember) {
          window.open(
            `${import.meta.env.VITE_BASE_URL}/auth/google/callback?rememberMe=true`,
            "_self"
          );
        } else {
          window.open(
            `${import.meta.env.VITE_BASE_URL}/auth/google/callback?rememberMe=false`,
            "_self"
          );
        }
      }
 } 
 catch (error) {
   console.log("Please log in again");
if (Remember) {
  window.open(
    `${import.meta.env.VITE_BASE_URL}/auth/google/callback?rememberMe=true`,
    "_self"
  );
} else {
  window.open(
    `${import.meta.env.VITE_BASE_URL}/auth/google/callback?rememberMe=false`,
    "_self"
  );
}
 }

}
  const loginwithgithub = async () => {
    
try { 
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/validate-token`,
    {
      withCredentials: true,
    }
  );
  const user = response.data.user;
  const name = user.github.displayName;
  if (name) {
    const profile = user["github"];
    console.log(user);
    setUser((prevState) => ({
      ...prevState,
      userName: profile.displayName,
      avatarProps: profile.image,
      highres_img: profile.img,
      isLoggedIn: true,
      email: user.email!,
      bio: profile.bio,
      Permissions: user.Permissions,
    }));
    navigate("/home");
  } else {

     window.open(
       `${import.meta.env.VITE_BASE_URL}/auth/github/callback`,
       "_self"
     );
   
  }
} catch (error) {
  console.log("Please log in again");

if (Remember) {
  window.open(`${import.meta.env.VITE_BASE_URL}/auth/github/callback`, "_self");
} else {
  window.open(
    `${import.meta.env.VITE_BASE_URL}/auth/github/callback?rememberMe=false`,
    "_self"
  );
}
}
  };
const [Response] = useState("")
const [loading, setLoading] = useState(false);
  const [EmailisInvalid, setEmailisInvalid] = useState(false);
   const [PassisInvalid, setPassisInvalid] = useState(false);
const [isvisible, setIsvisible] = useState(false);
  // const [quote, setQuote] = useState(
  //   "Globalization, as defined by rich people like us, is a very nice thing... you are talking about the Internet, you are talking about cell phones, you are talking about computers. This doesn't affect two-thirds of the people of the world."
  // );  
const navigate = useNavigate();
// const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
//   setLoading(true);
//   event.preventDefault();

//     setResponse("Please enter a valid email");
//     setIsvisible(true);
//     return setLoading(false);


// };

  // useEffect(() => {
  //   RandomQuoteGenerator()
  //   .then((data) => {
  //     setQuote(data[0].quote);
  //   });
  // },[]);
  
    return (
      <>
        {/* <div className='loading h-[100vh] flex items-center justify-center'>
          <ReloadIcon className='animate-spin h-10 w-10' />
        </div> */}

        <div className='flex justify-center align-center'>
          {/* <Alertcustom
              message={Response}
              isvisible={isvisible}
              setIsvisible={setIsvisible}
            /> */}
        </div>
        <div className='Parent-Box flex flex-col lg:flex-row '>
          <div className='Left lg:flex hidden w-full lg:w-[30rem]'>
            <div className='Box max-w-2xl w-full min-w-sm'>
              <h2 className='h2-Login-leftbox'>Login</h2>
              <div>
                <AnimatedCode />
              </div>
            </div>
          </div>

          <div className='Right w-full lg:w-auto flex justify-start items-center h-[70vh] lg:h-auto '>
            <h1 className='h1-Login'>Welcome Back</h1>
            <h3 className='h3-login'>Log in to your account to continue</h3>
            <div className='Box'>
              <Btn
                btnStyles='md:w-[25rem] w-[100%] bg-black border-2 border-[#3E3E45] mt-2.5 text-base text-white'
                logo={GoogleIcon}
                Text='Continue with Google'
                onClick={loginwithgoogle}
              />

              <Btn
                btnStyles='md:w-[25rem] w-[100%] bg-black border-2 border-[#3E3E45] mt-2.5 text-base text-white'
                logo={GithubIcon}
                Text='Continue with Github'
                onClick={loginwithgithub}
              />
              <div className='flex justify-center items-center space-x-8 mt-[1rem]'>
                <div className='w-20 border-t border-gray-400'></div>
                <h5>OR</h5>
                <div className='w-20 border-t border-gray-400'></div>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <EmailInput
                  id='email'
                  variant='flat'
                  value={formik.values.email}
                  name='email'
                  onChange={formik.handleChange}
                  validate={validateEmail}
                  errors={formik.errors}
                  isInvalid={EmailisInvalid}
                />
                <Alertcustom
                  message={Response}
                  isvisible={isvisible}
                  setIsvisible={setIsvisible}
                />
                <PasswordInput
                  variant='flat'
                  placeholder='Enter your password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  validate={validatePassword}
                  errors={formik.errors}
                  isInvalid={PassisInvalid}
                />

                <div className='flex justify-around items-center mt-5'>
                  <div className="mr-5">
                    <CheckBox
                      text='Remember for 15 days'
                      onChange={formik.handleChange}
                      name='Remember'
                    />
                  </div>
                  <AnchorLink
                    text='Forgot Password?'
                    astyles='grey'
                    to='/forgotpass'
                  />
                </div>
                <div className='flex justify-center items-center'>
                  <Btn
                    btnStyles=' md:w-[25rem] w-[100%] mt-[1.5rem] mb-2.5 bg-nprimary border-2 border-[#3E3E45]  text-base text-center text-white'
                    Text='Log In'
                    isloading={loading}
                  />
                </div>
                <div className='flex justify-around items-center'>
                  <span>Need to Create New Account ?</span>
                  <AnchorLink text='Sign Up' astyles='grey' to='/signup' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

