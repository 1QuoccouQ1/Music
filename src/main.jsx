import App from './App.jsx'
import './index.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Dashboard from './page/Dashboard.jsx'
import ArtistGallery from './page/Artist/ArtistGallery.jsx'
import RankingBoard from './page/BXH/RankingBoard.jsx'
import Genre from './page/genre.jsx';
import History from './page/History.jsx';
import Albums from './page/Albums.jsx';
import MusicLibrary from './page/Library/MusicLibrary.jsx'
import ShowChart from './page/MeChart/ShowChart.jsx';
import ProfilePage from './page/information/Profile/ProfilePage.jsx';
import ProfileLibrary from './page/information/Profile/ProfileLibrary.jsx';

import Information from './page/information/Profile/Information.jsx';
import Login from './layouts/Login.jsx';
import Register from './layouts/Register.jsx';
import PasswordCode from './layouts/PasswordCode.jsx';
import PasswordReset from './layouts/PasswordReset.jsx';
import PaySuccess from './page/Payment/PaySuccess.jsx';
import PayFail from './page/Payment/PayFail.jsx';
import PayError from './page/Payment/PayError.jsx';
import Payment from './page/Payment/Payment.jsx';
import Upgrade from './page/Upgrade.jsx';
import NewPassword from './layouts/NewPassword.jsx';


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
      },
      {
        path: "/PaySuccess",
        element: <PaySuccess/>
      },
      {
        path: "/PayFail",
        element: <PayFail/>
      },
      {
        path: "/PayError",
        element: <PayError/>
      },
      {
        path: "/Payment",
        element: <Payment/>
      },
      {
        path:"/BXH",
        element: <RankingBoard/>
      },
      {
        path: "/Library",
        element: <MusicLibrary/>,
      },
      {
        path: "/MeChart",
        element: <ShowChart/>,
      },
      {
        path: "/info",
        element: <ProfilePage />,
      },
    
      {
        path:"/Information",
        element: <Information/>
      },
    
      {
        path:"/Upgrade",
        element: <Upgrade/>
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
  {
    path: "/NewPassword",
    element: <NewPassword/>
  },
  {
    path: "/ProfileLibrary",
    element: <ProfileLibrary/>
  }
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
