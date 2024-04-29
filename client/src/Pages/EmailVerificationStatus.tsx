import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function EmailVerificationStatus() {
    const params = useParams();
    const navigate = useNavigate();
    const emailVerificationToken = params.emailVerificationToken;
    useEffect(()=>{
        try{
          const response=   axios.get(
              `http://localhost:3000/verify-email/${emailVerificationToken}`
              );
                response.then((res)=>{
                    console.log(res.data.message)
                    toast.success(res.data.message, {
                        position: "top-center",
                    })
                    setTimeout(() => {
                        navigate("/login")
                    },3000)
                })
        }
        catch(err){
            console.log(err)
        }
    },[])
    return (
        <>
            <h1>email verified</h1>
        </>
    )
}