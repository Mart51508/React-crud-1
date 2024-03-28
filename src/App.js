import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home/Home";
import * as React from "react";
import Layout from "./Component/Layout/Layout";
import Contact from "./Component/Contact/Contact";
import { Toaster } from "react-hot-toast";
import MainContextProvider from "./Component/Context/MainContext";
import Update from "./Component/Update/Update";

function App() {
  const Routes = createBrowserRouter([
    { path: "", element: <Layout /> },
    { index: true, element: <Home /> },
    { path: "Contact", element: <Contact /> },
    { path: "Update/:id", element: <Update /> },
  ]);
  return (
    <>
      <MainContextProvider>
        <RouterProvider router={Routes} />
        <Toaster />
      </MainContextProvider>
    </>
  );
}

export default App;
