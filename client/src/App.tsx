import Home from "./Pages/Home";
import "./App.css";
import { Routes, Route, useNavigate,useLocation} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/theme-provider";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import NavTest from "./components/NavTest";
import Csschallenges from "./Pages/Csschallenges";
import ChallengeDescription from "./Pages/ChallengeDescription";
import UserContext from "./components/UserContext";
import Profile from "./Pages/Profile";
import { useEffect, useState } from "react";
import Csselements from "./Pages/Csselements";
import Editor from "./Pages/Editor";
import ViewCsselement from "./components/ViewCsselement";
import CssChallengecreate from "./Pages/CssChallengecreate";
import RootLayout from "./components/Alert";
import CssElementsCategory from "./components/CssElementsCategory";
import AdminPanel from "./Pages/AdminPanel";
import PostApprovalReject from "./components/PostApprovalReject";
import NoPermissions from "./components/NoPermissions";
import axios from "axios";
import PermissionManager from "./Pages/PermissionManager";
import UploadData from "./components/UploadData";

import EventManagement from "./Pages/EventManagement";
import EditEventModal from "./components/EditEventModal";
import EventDescription from "./components/EventDescription";

import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import ChallengesPosts from "./components/ChallengesPosts";
import ViewChallengePostCode from "./Pages/ViewChallengePostsCode";

function App() {
  const location = useLocation();
    const navigate = useNavigate();
const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    userName: "",
    data: {},
    description: "CoreNex UI User",
    avatarProps:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
    highres_img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
    email: "",
    isLoggedIn: false,
    bio: "",
    Permissions: ["newuser"],
  });

const [permission,setpermission] = useState(["newuser"]);
const fetchUserData = async () => {
  try {
    const response = await axios("http://localhost:3000/validate-token", {
      withCredentials: true,
    });
 setpermission(response.data.user.Permissions)
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(()=>{
fetchUserData();
  },[])
useEffect(() => {



  if (
    user.isLoggedIn &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    navigate("/home");
  }
}, [user.isLoggedIn, location.pathname]);

const checkPermissions = (
  userPermissions: string | any[],
  requiredPermissions: any[]
) => {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NextUIProvider navigate={navigate}>
          <ThemeProvider defaultTheme='light'>
            <RootLayout />
            <NavTest />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/home' element={<Home />} />
              <Route path='/Csschallenges' element={<Csschallenges />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/event' element={<EventManagement />} />
              <Route
                path='/Csselements/:category'
                element={<CssElementsCategory />}
              />
              ;
              <Route
                path='/Csschallenges/:id'
                element={<ChallengeDescription />}
              />
              <Route
                path='/CssChallengecreate/:id'
                element={<CssChallengecreate />}
              />
              <Route path='/event/:id' element={<EventDescription />} />
              <Route path='/Csselements' element={<Csselements />} />
              <Route path='/editor/create/:id' element={<Editor />} />
              <Route path='/editor/:id' element={<ViewCsselement />} />
              <Route path='/verify/:email' element={<VerifyEmail />} />
              <Route path='/forgotpass' element={<ForgotPassword />} />
              <Route
                path='/csschallenge/editor/:id'
                element={<ViewChallengePostCode />}
              />
              <Route
                path='/admin'
                element={
                  loading ? (
                    <div>Loading</div>
                  ) : checkPermissions(user.Permissions, ["admin"]) ? (
                    <AdminPanel />
                  ) : (
                    <NoPermissions />
                  )
                }
              />{" "}
              <Route
                path='/admin/uploadattendance'
                element={
                  loading ? (
                    <div>Loading</div>
                  ) : checkPermissions(user.Permissions, ["admin"]) ? (
                    <UploadData />
                  ) : (
                    <NoPermissions />
                  )
                }
              />
              <Route
                path='/admin/managepermissions'
                element={
                  loading ? (
                    <div>Loading</div>
                  ) : checkPermissions(user.Permissions, ["admin"]) ? (
                    <PermissionManager />
                  ) : (
                    <NoPermissions />
                  )
                }
              />
              <Route
                path='/admin/csselements/status'
                element={
                  loading ? (
                    <div>Loading</div>
                  ) : checkPermissions(user.Permissions, [
                      "admin",
                      "approveposts",
                      "rejectposts",
                    ]) ? (
                    <PostApprovalReject />
                  ) : (
                    <NoPermissions />
                  )
                }
              />
            </Routes>
          </ThemeProvider>
        </NextUIProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
