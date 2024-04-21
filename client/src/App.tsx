import Home from "./Pages/Home";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/theme-provider";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import NavTest from "./components/NavTest";
import Csschallenges from "./Pages/Csschallenges";
import ChallengeDescription from "./Pages/ChallengeDescription";
import UserContext from "./components/UserContext";
import Profile from "./Pages/Profile";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Csselements from "./Pages/Csselements";
import Editor from "./Pages/Editor";
import ViewCsselement from "./components/ViewCsselement";
import CssChallengecreate from "./Pages/CssChallengecreate";
function App() {
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
  });

  const navigate = useNavigate();

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NextUIProvider navigate={navigate}>
          <ThemeProvider defaultTheme='light'>
            <NavTest />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/home' element={<Home />} />
              <Route path='/Csschallenges' element={<Csschallenges />} />
              <Route path='/Profile' element={<Profile />} />
              <Route
                path='/Csschallenges/:id'
                element={<ChallengeDescription />}
              />
              <Route
                path='/CssChallengecreate/:id'
                element={<CssChallengecreate />}
              />
              <Route path='/Csselements' element={<Csselements />} />
              <Route path='/editor/create/:id' element={<Editor />} />
              <Route path='/editor/:id' element={<ViewCsselement />} />
            </Routes>
          </ThemeProvider>
        </NextUIProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
