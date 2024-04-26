import LoadUserInfo from "@/components/LoadUserInfo";
import AssignPermissions from "@/components/AssignPermissions";
export default function PermissionManager() {
    return (
      <> 
      <h1 className="text-center">Want To Assign Permissions?</h1>
      <AssignPermissions/>
      
      <h1 className="text-center">Want Single User Info ?</h1>
        <LoadUserInfo />
      </>
    );
}