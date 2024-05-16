import "@/Styles/NotFoundPage.css";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner"
export default function NotFoundPage() {
  const navigate = useNavigate();
  toast.error("Error 404! Page Not Found. Redirecting to Home Page", {
    position: "top-center",
      action:{
        label:"X",
        onClick:()=>toast.dismiss(),
      }
  });
 
 
  setTimeout(() => {
    navigate("/home");
  }, 4000);
  return (
    <div className='container'>
      <form className='four-oh-four-form'>
        <input type='text' className='404-input' />
      </form>

      <div className='terminal'>
        <p className='prompt'>Error 404!</p>
        <p className='prompt'>Page Not Found</p>
        <p className='prompt output new-output'></p>
      </div>
    </div>
  );
}