import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function NoPermissions() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("You don't have permissions to perform this action!",{
        position:"top-center"
    });
    navigate("/"); // redirect to home page or any other page
  }, [navigate]);

  return null;
}
export default NoPermissions;