import { Button } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import  Otp  from "@/components/Otp";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { toast } from "sonner";
import {useNavigate} from 'react-router-dom';
export default function VerifyEmail(){
    const navigate = useNavigate();
      const [value, setValue] = useState("");
const params = useParams();
const email = params.email;
    const resendotp = (e) => {
        e.preventDefault();
        const response = axios.post(
          `http://localhost:3000/verify/${email}/resendotp`
        );
        response.then((res) => {
          if (res.data.message === "Email already verified") {
            navigate("/login");
          }
            toast.info(res.data.message, {
                position: "top-center",
            })
        })
    }
const verifyotp = (e) => {
    e.preventDefault();
    const response = axios.post(
      `http://localhost:3000/verify/${email}/verifyotp`,
      { otp: value }
    );
    response.then((res) => {
     
        toast.info(res.data.message, {
            position: "top-center",
        })
        if (
          res.data.message === "Email already verified" ||
          res.data.message === "Email verified successfully"
        ) {
          navigate("/login");
        }
       
    })
};  
const getlink = (e) => {
    e.preventDefault();
    const response = axios.post(
      `http://localhost:3000/send-verification-email`,{
        email:email
      }
    );
    response.then((res) => {
           if (res.data.message === "Email already verified") {
             navigate("/login");
           }
        toast.info(res.data.message, {
            position: "top-center",
        })
    })

}

    useEffect(()=>{

        const response = axios.get(
          `http://localhost:3000/verify/${email}/getotp`
        );
    
        response.then((res) => {
              if (res.data.message === "Email already verified") {
                navigate("/login");
              }
                 if (res.data.message === "User not found register first") {
                   navigate("/signup");
                 }
          
            toast.info(res.data.message, {
                position: "top-center",
            })
            
        })
    },[])
    return (
      <>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex w-[70%] flex-col justify-center items-center'>
            <Tabs>
              <Tab key='VerifyByCode' title='Verify By Otp'>
                <Card>
                  <CardBody>
                    <div className='flex justify-center items-center flex-col gap-[3rem] p-5'>
                      <h1>Enter Your One Time Password(OTP)</h1>
                      <div className='overflow-x-clip p-1'>
                        <Otp value={value} setValue={setValue} />
                      </div>

                      <Button
                        variant='shadow'
                        color='primary'
                        onClick={(e) => verifyotp(e)}
                      >
                        Verify
                      </Button>

                      <Link
                        href='#'
                        color='foreground'
                        onClick={(e) => resendotp(e)}
                      >
                        Resend Otp
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key='VerifyByLink' title='VerifyByLink'>
                <Card>
                  <CardBody>
                    <Button
                      variant='shadow'
                      color='primary'
                      onClick={(e) => getlink(e)}
                    >
                      Get Email Verification Link
                    </Button>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </>
    );
}