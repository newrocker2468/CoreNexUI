import Home from "./Pages/Home"
import './App.css'
import {Routes,Route, useNavigate} from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/theme-provider";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import NavTest from "./components/NavTest";
import Csschallenges from "./Pages/Csschallenges";
function App() {

  const navigate = useNavigate();
  return (
    <>
      <NextUIProvider navigate={navigate}>
        <ThemeProvider defaultTheme='light'>
        <NavTest />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/Csschallenges' element={<Csschallenges />} />
        </Routes>
        </ThemeProvider>
      </NextUIProvider>
    </>
  );
}

export default App
