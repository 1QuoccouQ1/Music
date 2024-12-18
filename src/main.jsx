import App from "./App.jsx";
import "./index.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Dashboard from "./page/Dashboard.jsx";
import ArtistGallery from "./page/Artist/ArtistGallery.jsx";
import RankingBoard from "./page/BXH/RankingBoard.jsx";
import Genre from "./page/Genre/genre.jsx";
import History from "./page/History.jsx";
import Albums from "./page/Albums/Albums.jsx";
import MusicLibrary from "./page/Library/MusicLibrary.jsx";
import ShowChart from "./page/MeChart/ShowChart.jsx";
import SongGlobal from "./page/BXH/SongGlobal.jsx";

import Information from "./page/information/Information.jsx";
import InfoLibrary from "./page/information/Profile/infoLibrary.jsx";
import ListenedMusic from "./page/information/Profile/ListenedMusic.jsx";
import PlayLists from "./page/information/Profile/Playlists.jsx";
import Artist from "./page/information/Profile/Artist.jsx";
import InfoAlbums from "./page/information/Profile/InfoAlbums.jsx";

import Login from "./layouts/Login.jsx";
import Register from "./layouts/Register.jsx";
import PasswordCode from "./layouts/PasswordCode.jsx";
import PasswordReset from "./layouts/PasswordReset.jsx";
import NewPassword from "./layouts/NewPassword.jsx";

import ProfileEditPage from "./page/Setting/ProfileEditPage.jsx";
import ChangePasswordPage from "./page/Setting/ChangePasswordPage.jsx";
import PurchaseHistoryPage from "./page/Setting/PurchaseHistory/PurchaseHistoryPage.jsx";
import ManagePayment from "./page/Setting/PurchaseHistory/ManagePayment.jsx";
import ManagerHistory from "./page/Setting/PurchaseHistory/ManagerHistory.jsx";
import InvoiceDetail from "./page/Setting/PurchaseHistory/InvoiceDetail.jsx";
import ContactForm from "./page/Setting/ContactForm.jsx";
import SettingsPage from "./page/Setting/SettingsPage.jsx";
import AboutUs from "./page/Setting/AboutUs.jsx";
import Privacy from "./page/Setting/Privacy.jsx";

import PayNotification from "./page/Payment/PayNotification.jsx";
import Payment from "./page/Payment/Payment.jsx";
import Upgrade from "./page/Upgrade.jsx";
import ProfileArtist from "./page/BXH/ProfileArtist.jsx";
import SongDetail from "./page/Song/SongDetail.jsx";
import GenreSongs from "./page/Genre/GenreSongs.jsx";
import AlbumDetail from "./page/Albums/AlbumDetail.jsx"
import ListTopSongs from "./page/Top/ListTopSongs.jsx";
import ListPlayLists from "./page/Play-list/ListPlayLists.jsx";
import ShowPlayLists from "./page/Play-list/ShowPlayLists.jsx";

function changeIsSetting() {
  localStorage.setItem("isSetting", true);
  sessionStorage.removeItem("reloaded");
  return null;
}

function changeDashboard() {
  localStorage.setItem("isSetting", false);
  return null;
}
function changeLogo() {
  localStorage.setItem("isSetting", false);
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        loader: changeLogo,
        element: <Dashboard />,
      },
      {
        path: "/Genre",
        loader: changeDashboard,
        element: <Genre />,
      },
      {
        path: "/History",
        loader: changeDashboard,
        element: <History />,
      },
      {
        path: "/Albums",
        loader: changeDashboard,
        element: <Albums />,
      },
      {
        path: "/PlayLists",
        loader: changeDashboard,
        element: <ShowPlayLists />,
      },
      {
        path: "/AlbumDetail/:id",
        loader: changeDashboard,
        element: <AlbumDetail />,
      },
      {
        path: "/Artist",
        loader: changeDashboard,
        element: <ArtistGallery />,
      },
      {
        path: "/PayNotification",
        loader: changeIsSetting,
        element: <PayNotification />,
      },
      // {
      //   path: "/PaySuccess",
      //   loader: changeIsSetting,
      //   element: <PaySuccess />,
      // },
      // {
      //   path: "/PayFail",
      //   loader: changeIsSetting,
      //   element: <PayFail />,
      // },
      // {
      //   path: "/PayError",
      //   loader: changeIsSetting,
      //   element: <PayError />,
      // },
      {
        path: "/Payment",
        loader: changeIsSetting,
        element: <Payment />,
      },
      {
        path: "/BXH",
        loader: changeDashboard,
        element: <RankingBoard />,
      },
      {
        path: "/Library",
        loader: changeDashboard,
        element: <MusicLibrary />,
      },
      {
        path: "/MeChart",
        loader: changeDashboard,
        element: <ShowChart />,
      },
      {
        path: "/Top/:param",
        loader: changeDashboard,
        element: <ListTopSongs />,
      },
      {
        path: "/Information",
        element: <Information />,
        children: [
          { index: true, element: <InfoLibrary /> },
          { path: "InfoLibrary", element: <InfoLibrary /> },
          { path: "ListenedMusic", element: <ListenedMusic /> },
          { path: "PlayLists", element: <PlayLists /> },
          { path: "InfoAlbums", element: <InfoAlbums /> },
          { path: "Artist", element: <Artist /> },
        ],
      },

      {
        path: "/ManagerHistory",
        element: <ManagerHistory />,
        children: [
          { index: true, element: <ManagePayment /> },
          { path: "PurchaseHistoryPage", element: <PurchaseHistoryPage /> },
          { path: "ManagePayment", element: <ManagePayment /> },
        ],
      },
      //Route for Setting
      {
        path: "/ProfileEditPage",
        loader: changeIsSetting,
        element: <ProfileEditPage />,
      },
      {
        path: "ChangePasswordPage",
        loader: changeIsSetting,
        element: <ChangePasswordPage />,
      },
      {
        path: "PurchaseHistoryPage",
        loader: changeIsSetting,
        element: <PurchaseHistoryPage />,
      },
      {
        path: "/InvoiceDetail",
        loader: changeIsSetting,
        element: <InvoiceDetail />,
      },
      {
        path: "/SettingsPage",
        loader: changeIsSetting,
        element: <SettingsPage />,
      },
      {
        path: "/ContactForm",
        loader: changeIsSetting,
        element: <ContactForm />,
      },
      {
        path: "/AboutUs",
        loader: changeIsSetting,
        element: <AboutUs />,
      },

      {
        path: "/Upgrade",
        loader: changeDashboard,
        element: <Upgrade />,
      },
      {
        path: "/ProfileArtist/:id",
        loader: changeDashboard,
        element: <ProfileArtist />,
      },
      {
        path: "/Privacy",
        loader: changeIsSetting,
        element: <Privacy />,
      },
      {
        path: "/SongGlobal/:id/",
        loader: changeDashboard,
        element: <SongGlobal />,
      },
      {
        path: "/SongDetail/:id",
        loader: changeDashboard,
        element: <SongDetail />,
      },
      {
        path: "/GenreSongs/:id/",
        loader: changeDashboard,
        element: <GenreSongs />,
      },
      {
        path: "/Playlists/:id/:param",
        loader: changeDashboard,
        element: <ListPlayLists />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/PasswordCode",
    element: <PasswordCode />,
  },
  {
    path: "/PasswordReset",
    element: <PasswordReset />,
  },
  {
    path: "/NewPassword",
    element: <NewPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
