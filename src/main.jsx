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
import ShowChart from './page/MeChart/ShowChart.jsx'


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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
