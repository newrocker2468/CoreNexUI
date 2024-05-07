import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "@/Icons/email.json";

export default function EmailVerificationStatus() {
  const params = useParams();
  const navigate = useNavigate();
  const emailVerificationToken = params.emailVerificationToken;
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    try {
      const response = axios.get(
        `http://localhost:3000/verify-email/${emailVerificationToken}`
      );
      response.then((res) => {
        console.log(res.data.message);
        if (res.data.message === "Email verified successfully") {
          setIsVerified(true);
  
        } 
        toast.success(res.data.message, {
          position: "top-center",
        });
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return isVerified ? (
    <div className='flex justify-center items-center flex-col'>
      <h1>Email Verified Successfully</h1>
      <Lottie options={defaultOptions} width={150} height={150} />
    </div>
  ) : null;
}
