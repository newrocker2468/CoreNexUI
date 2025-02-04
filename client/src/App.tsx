/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Home from "./Pages/Home";
import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import EventDescription from "./components/EventDescription";

import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import ViewChallengePostCode from "./Pages/ViewChallengePostsCode";
import EmailVerificationStatus from "./Pages/EmailVerificationStatus";
import NotesUpload from "./Pages/NotesUpload";
import NotesUploadComp from "./components/NotesUploadComp";
import UserGuide from "./Pages/UserGuide";
import Loader from "./components/Loader";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  axios.defaults.withCredentials = true;
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

const [,setpermission] = useState(["newuser"]);
const fetchUserData = async () => {
  try {
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/validate-token`,
      {
        withCredentials: true,
      }
    );
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
          <ThemeProvider defaultTheme='dark'>
            <RootLayout />
            <NavTest />
            <Routes>
              <Route path='*' element={<NotFoundPage />} />
              <Route path='/notes/upload/*' element={<NotesUploadComp />} />
              <Route path='/loader' element={<Loader />} />
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
              <Route path='/docs' element={<UserGuide />} />
              <Route path='/notes/upload' element={<NotesUpload />} />
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
                path='/verify-email/:emailVerificationToken'
                element={<EmailVerificationStatus />}
              />
              <Route
                path='/csschallenge/editor/:id'
                element={<ViewChallengePostCode />}
              />
              <Route
                path='/admin'
                element={
                  loading ? (
                    <div className='flex justify-center items-center'>
                      <Loader />
                    </div>
                  ) : checkPermissions(user.Permissions, [
                      "admin",
                      "approveposts",
                      "rejectposts",
                      "editcsselement",
                      "deletecsselement",
                      "createchallenges",
                      "deletechallenges",
                      "editchallenges",
                      "createevents",
                      "editevents",
                      "deleteevents",
                      "deletenotes",
                      "updatesubmissions",
                      "deletesubmissions",
                    ]) ? (
                    <AdminPanel />
                  ) : (
                    <NoPermissions />
                  )
                }
              />
              <Route
                path='/admin/uploadattendance'
                element={
                  loading ? (
                    <div className='flex justify-center items-center'>
                      <Loader />
                    </div>
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
                    <div className='flex justify-center items-center'>
                      <Loader />
                    </div>
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
                    <div className='flex justify-center items-center'>
                      <Loader />
                    </div>
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
