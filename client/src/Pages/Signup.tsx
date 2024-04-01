// import RandomQuoteGenerator from "@/middlewares/RandomQuoteGenerator";
import { useState } from "react";
import EmailInput from "@/components/EmailInput.tsx";
import "../output.css";
import Btn from "@/components/Btn";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
// import AnchorLink from "@/components/AnchorLink";
// import ShadBtn from "../Components/ShadBtn";
// import GithubIcon from "../Icons/github-mark-white.svg";
// import GoogleIcon from "../Icons/GoogleIcon.svg";
import { useTheme } from "../components/theme-provider";

export default function Signup() {
  const [EmailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-grey" : "bg-white";
  console.log(theme);

  return (
    <>
      <div className='parent-box '>
        <div
          className={`signup w-[30rem]  h-[45rem] ${bgColor} rounded-[1.5rem] flex justify-center items-center flex-col`}
        >
          <h1 className={`flex justify-center items-center `}>Sign Up</h1>
          <EmailInput
            variant='bordered'
            setv={setEmailValue}
            value={EmailValue}
          />
          <PasswordInput name="password" variant='bordered' placeholder='enter your password' onChange={setPasswordValue}/>
          <PasswordInput
            variant='bordered'
            placeholder='Re-enter your password'
          />
          <CheckBox
            text='I agree to the Terms and Privacy Policy'
            boxstyles='mt-4'
          />
          <Btn
            Text='Sign Up'
            btnStyles='bg-nprimary  p-[1rem] px-[11rem] mt-[2rem] rounded-[0.7rem]'
          />
        </div>
      </div>
    </>
  );
}
