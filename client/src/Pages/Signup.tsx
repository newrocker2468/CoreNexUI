// import RandomQuoteGenerator from "@/middlewares/RandomQuoteGenerator";
import { useState } from "react";
import EmailInput from "@/components/EmailInput.tsx";
import Btn from "@/components/Btn";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
// import AnchorLink from "@/components/AnchorLink";
// import ShadBtn from "../Components/ShadBtn";
// import GithubIcon from "../Icons/github-mark-white.svg";
// import GoogleIcon from "../Icons/GoogleIcon.svg";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/theme-provider";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";

type FormikValues = {
  email: string;
  password: string;
  repassword: string;
  terms: false;
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

function validatePassword(value: FormikValues["password"]) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 8) {
    error = "Password must be atleast 8 characters long";
  } else if (!/(?=.*[0-9])/.test(value)) {
    error = "Password must contain a number";
  } else if (!/(?=.*[a-z])/.test(value)) {
    error = "Password must contain a lowercase letter";
  } else if (!/(?=.*[A-Z])/.test(value)) {
    error = "Password must contain an uppercase letter";
  } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
    error = "Password must contain a special character";
  }

  return error;
}

function validateRePassword(repassword: FormikValues["repassword"]) {
  let error;
  if (!repassword) {
    error = "Required";
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

export default function Signup() {
  const [EmailisInvalid, setEmailisInvalid] = useState(false);
  const [PassisInvalid, setPassisInvalid] = useState(false);
  const [RePassisInvalid, setRePassisInvalid] = useState(false);
  const [CheckBoxisInvalid, setCheckBoxisInvalid] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-grey" : "bg-white";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
      terms: false,
    },
    onSubmit: (values) => {
      try {
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/register`, {
            email: values.email,
            password: values.password,
            repassword: values.repassword,
          })
          .then((res) => {
            console.log(res);
            toast.info(res.data.message, {
              position: "top-center",
            });
            if (
              res.data.message ===
                "Registration done successfully. Please verify your email." ||
              res.data.message ===
                "User already exists, Please verify your email!"
            ) {
              navigate(`/verify/${values.email}`, { replace: true });
            }
            if (res.data.message === "User already exists , Please Login!") {
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },
    validate: (values) => {
      const errors: {
        email?: string;
        password?: string;
        repassword?: string;
        terms?: string;
      } = {};

      const emailError = validateEmail(values.email);
      const passwordError = validatePassword(values.password);
      const repasswordError = validateRePassword(values.repassword);

      if (emailError) {
        errors.email = emailError;
        setEmailisInvalid(true);
      } else {
        setEmailisInvalid(false);
      }
      if (passwordError) {
        errors.password = passwordError;
        setPassisInvalid(true);
      } else {
        setPassisInvalid(false);
      }
      if (repasswordError) {
        errors.repassword = repasswordError;
        console.log(errors.repassword);
        setRePassisInvalid(true);
      } else {
        setRePassisInvalid(false);
      }
      if (values.password !== values.repassword) {
        errors.password = "Passwords do not match";
        setRePassisInvalid(true);
        setPassisInvalid(true);
      }
      if (!values.terms) {
        errors.terms = "You must agree to the Terms and Privacy Policy";
        setCheckBoxisInvalid(true);
      } else {
        setCheckBoxisInvalid(false);
      }
      return errors;
    },
  });
  return (
    <>
      <div className='parent-box w-full flex items-center justify-center'>
        <div
          className={`signup w-[30rem]  h-[45rem] ${bgColor} rounded-[1.5rem] flex justify-center align-center flex-col`}
        >
          <h1 className={`flex justify-center items-center `}>
            User Registration
          </h1>
          <p className='text-center'>
            Please fill in the form below to create an account.
          </p>
          <form
            action=''
            onSubmit={formik.handleSubmit}
            className='flex justify-center items-center flex-col'
          >
            <EmailInput
              id='email'
              variant='bordered'
              value={formik.values.email}
              name='email'
              onChange={formik.handleChange}
              validate={validateEmail}
              errors={formik.errors}
              isInvalid={EmailisInvalid}
            />
            <PasswordInput
              variant='bordered'
              placeholder='Enter your password'
              name='password'
              value={formik.values.password}
              validate={validatePassword}
              onChange={formik.handleChange}
              errors={formik.errors}
              isInvalid={PassisInvalid}
              styles='sm:w-[26rem]'
            />
            <PasswordInput
              variant='bordered'
              placeholder='Confirm your password'
              name='repassword'
              value={formik.values.repassword}
              onChange={formik.handleChange}
              validate={validateRePassword}
              errors={formik.errors}
              isInvalid={RePassisInvalid}
              styles='sm:w-[26rem]'
            />
            <CheckBox
              text='I accept the Terms of Service and Privacy Policy'
              boxstyles='mt-4'
              name='terms'
              onChange={formik.handleChange}
              isInvalid={CheckBoxisInvalid}
            />

            <Btn
              Text='Register'
              btnStyles='bg-nprimary  p-[1rem] md:w-[25rem] w-[60%] mt-[2rem] rounded-[0.7rem]'
            />
          </form>
        </div>
      </div>
    </>
  );
}
