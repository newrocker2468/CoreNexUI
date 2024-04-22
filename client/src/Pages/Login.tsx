
import "../Styles/Login.css";
// import RandomQuoteGenerator from "@/middlewares/RandomQuoteGenerator";
import { useState, useContext, useEffect } from "react";
import EmailInput from "@/components/EmailInput.tsx";
import "../output.css";
import Btn from "@/components/Btn";
import GithubIcon from "../Icons/github-mark-white.svg";
import GoogleIcon from "../Icons/GoogleIcon.svg";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
import AnchorLink from "@/components/AnchorLink";
import { useNavigate } from "react-router-dom";
import Alertcustom from "@/components/Alertcustom.tsx";
import { useFormik } from "formik";
import AnimatedCode from "@/components/AnimatedCode";
import UserContext from "@/components/UserContext";
import axios from "axios";

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
    const { user, setUser } = useContext(UserContext);
    const [Remember, setRemember] = useState(false);
 const formik = useFormik({
   initialValues: {
     email: "",
     password: "",
     Remember: false,
   },
   onSubmit: (values) => {
 try {
   axios
     .post(
       "http://localhost:3000/login",
       {
         email: values.email,
         password: values.password,
         remember: Remember,
       },
       { withCredentials: true }
     )
     .then((response) => {
       console.log(response.data);
     });
 } catch (err) {
   console.log(err);
 }
  setLoading(true);
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
   const response = await axios.get("http://localhost:3000/validate-token", {
     withCredentials: true,
   });
   const user = response.data.user;
         const name = user.google.displayName; 
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
        }));
        navigate("/home");
      }
      else{
        if (Remember) {
          window.open(
            "http://localhost:3000/auth/google/callback?rememberMe=true",
            "_self"
          );
        } else {
          window.open(
            "http://localhost:3000/auth/google/callback?rememberMe=false",
            "_self"
          );
        }
      }
 } 
 catch (error) {
   console.log("Please log in again");
if (Remember) {
  window.open(
    "http://localhost:3000/auth/google/callback?rememberMe=true",
    "_self"
  );
} else {
  window.open(
    "http://localhost:3000/auth/google/callback?rememberMe=false",
    "_self"
  );
}
 }

}
  const loginwithgithub = async () => {
try {
  const response = await axios.get("http://localhost:3000/validate-token", {
    withCredentials: true,
  });
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
    }));
    navigate("/home");
  } else {
   if (Remember) {
     window.open(
       "http://localhost:3000/auth/github/callback?rememberMe=true",
       "_self"
     );
   } else {
     window.open(
       "http://localhost:3000/auth/github/callback?rememberMe=false",
       "_self"
     );
   }
  }
} catch (error) {
  console.log("Please log in again");

if (Remember) {
  window.open(
    "http://localhost:3000/auth/github/callback?rememberMe=true",
    "_self"
  );
} else {
  window.open(
    "http://localhost:3000/auth/github/callback?rememberMe=false",
    "_self"
  );
}
}
  };
const [Response, setResponse] = useState("")
const [loading, setLoading] = useState(false);
  const [EmailisInvalid, setEmailisInvalid] = useState(false);
   const [PassisInvalid, setPassisInvalid] = useState(false);
const [isvisible, setIsvisible] = useState(false);
  // const [quote, setQuote] = useState(
  //   "Globalization, as defined by rich people like us, is a very nice thing... you are talking about the Internet, you are talking about cell phones, you are talking about computers. This doesn't affect two-thirds of the people of the world."
  // );  
const navigate = useNavigate();
const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
  setLoading(true);
  event.preventDefault();

    setResponse("Please enter a valid email");
    setIsvisible(true);
    return setLoading(false);


};

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
        <div className='Parent-Box'>
          <div className='Left'>
            <div className='Box max-w-2xl w-[50dvw] min-w-sm'>
              <h2 className='h2-Login-leftbox'>Login</h2>

              {/* <h1 className='innerBox-h1'> Random Quote</h1> */}

              <div>
                {" "}
                <AnimatedCode />
              </div>
              {/* <div id='video-background'>
                    <video autoPlay muted loop id='myVideo'>
                      <source src={`${codeanimation}`} type='video/mp4' />
                    </video>

                    <div className='content w-[50vw]'>
                      <h1>Heading</h1>
                      <p>Lorem ipsum...</p>
                    </div>
                   
                  </div> */}
              {/* <p>{quote}</p> */}
            </div>
          </div>

          <div className='Right'>
            <h1 className='h1-Login'>Welcome Back</h1>
            <h3 className='h3-login'>Log in to your account to continue</h3>
            <div className='Box'>
              <Btn
                btnStyles='w-[400px] bg-black border-2 border-[#3E3E45] mt-2.5 text-base text-white'
                logo={GoogleIcon}
                Text='Continue with Google'
                onClick={loginwithgoogle}
              />

              <Btn
                btnStyles='w-[400px] bg-black border-2 border-[#3E3E45] mt-2.5 text-base text-white'
                logo={GithubIcon}
                Text='Continue with Github'
                onClick={loginwithgithub}
              />

              <div className='hrAlign'>
                <hr className='hr' />
                <h5 className=''>OR</h5>
                <hr className='hr' />
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

                <div className='Logfooter'>
                  <CheckBox
                    text='Remember for 15 days'
                    onChange={()=>{
                      setRemember(!Remember);
                    }}
                    name="Remember"
                  />
                  <AnchorLink
                    text='Forgot Password?'
                    astyles='grey'
                    to='/forgotpass'
                  />
                </div>
                <Btn
                  btnStyles='w-[400px] mt-[1.5rem] mb-2.5 bg-nprimary border-2 border-[#3E3E45]  text-base text-center text-white'
                  Text='Log In'
                  isloading={loading}
                />
                <div className='FooterAlign'>
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

