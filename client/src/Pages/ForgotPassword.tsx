
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const resetpass = () => {
        try{
          const response =  axios.post("http://localhost:3000/forgotpassword", {
                email: email,
            })
            response.then((res) => {
              toast.info(res.data.message, {
                position: "top-center",
              })
            })
        }
        catch(err){
            console.log(err);
        }
    }
    return (
      <>
        <div className='flex justify-center items-center flex-col gap-[1rem] h-[70vh]'>
          <h1>Enter Your Email</h1>
          <Input
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            variant='bordered'
            label='Email'
            placeholder='Enter your email'
            size='md'
            className='w-[25rem]'
          />
          <Button color='primary' variant='shadow' onClick={resetpass}>
            Submit
          </Button>
        </div>
      </>
    );
}