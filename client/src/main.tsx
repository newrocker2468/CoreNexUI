import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/theme-provider.jsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <NextUIProvider>
      <BrowserRouter>
        {/* <main className='purple-dark text-foreground bg-background'> */}
          <App />
        {/* </main> */}
      </BrowserRouter>
    </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>
);
