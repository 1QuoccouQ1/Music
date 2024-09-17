import App from './App.jsx'
import './index.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Dashboard from './page/Dashboard.jsx'
import ArtistGallery from './page/Artist/ArtistGallery.jsx'
import Genre from './page/genre.jsx';
import History from './page/History.jsx';
import Albums from './page/Albums.jsx';
import Login from './layouts/Login.jsx';
import Register from './layouts/Register.jsx';
import PasswordCode from './layouts/PasswordCode.jsx';
import PasswordReset from './layouts/PasswordReset.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/Genre",
        element: <Genre/>,
      },
      {
        path: "/History",
        element: <History/>,
      },
      {
        path: "/Albums",
        element: <Albums/>,
      },
      {
        path:"/Artist",
        element: <ArtistGallery/>
      }

    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/PasswordCode",
    element: <PasswordCode/>
  },
  {
    path: "/PasswordReset",
    element: <PasswordReset/>
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
