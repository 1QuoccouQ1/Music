import App from './App.jsx';
import './index.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Dashboard from './page/Dashboard.jsx';
import ArtistGallery from './page/Artist/ArtistGallery.jsx';
import RankingBoard from './page/BXH/RankingBoard.jsx';
import Genre from './page/genre.jsx';
import History from './page/History.jsx';
import Albums from './page/Albums.jsx';
import MusicLibrary from './page/Library/MusicLibrary.jsx';
import ShowChart from './page/MeChart/ShowChart.jsx';

import Information from './page/information/Information.jsx';
import InfoLibrary from './page/information/Profile/infoLibrary.jsx';
import ListenedMusic from './page/information/Profile/ListenedMusic.jsx';
import PlayLists from './page/information/Profile/Playlists.jsx';
import Artist from './page/information/Profile/Artist.jsx';
import Downloaded from './page/information/Profile/Downloaded.jsx';
import Followed from './page/information/Profile/Followed.jsx';
import InfoAlbums from './page/information/Profile/InfoAlbums.jsx';

import Login from './layouts/Login.jsx';
import Register from './layouts/Register.jsx';
import PasswordCode from './layouts/PasswordCode.jsx';
import PasswordReset from './layouts/PasswordReset.jsx';

import ProfileEditPage from './page/Setting/ProfileEditPage.jsx';
import ChangePasswordPage from './page/Setting/ChangePasswordPage.jsx';

import PurchaseHistoryPage from './page/Setting/PurchaseHistory/PurchaseHistoryPage.jsx';
import ManagePayment from './page/Setting/PurchaseHistory/ManagePayment.jsx';
import ManagerHistory from './page/Setting/PurchaseHistory/ManagerHistory.jsx';

import InvoiceDetail from './page/Setting/PurchaseHistory/InvoiceDetail.jsx';
import ContactForm from './page/Setting/ContactForm.jsx';
import SettingsPage from './page/Setting/SettingsPage.jsx';
import AboutUs from './page/Setting/AboutUs.jsx';
import Privacy from './page/Setting/Privacy.jsx';

import PaySuccess from './page/Payment/PaySuccess.jsx';
import PayFail from './page/Payment/PayFail.jsx';
import PayError from './page/Payment/PayError.jsx';
import Payment from './page/Payment/Payment.jsx';
import Upgrade from './page/Upgrade.jsx';
import NewPassword from './layouts/NewPassword.jsx';
import MusicPlayer from './page/MusicPlayer.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/Genre',
                element: <Genre />
            },
            {
                path: '/History',
                element: <History />
            },
            {
                path: '/Albums',
                element: <Albums />
            },
            {
                path: '/Artist',
                element: <ArtistGallery />
            },
            {
                path: '/PaySuccess',
                element: <PaySuccess />
            },
            {
                path: '/PayFail',
                element: <PayFail />
            },
            {
                path: '/PayError',
                element: <PayError />
            },
            {
                path: '/Payment',
                element: <Payment />
            },
            {
                path: '/BXH',
                element: <RankingBoard />
            },
            {
                path: '/Library',
                element: <MusicLibrary />
            },
            {
                path: '/MeChart',
                element: <ShowChart />
            },
            {
                path: '/MusicPlayer',
                element: <MusicPlayer />
            },

            {
                path: '/Information',
                element: <Information />,
                children: [
                    {
                        index: true, // Default route
                        element: <InfoLibrary />
                    },
                    {
                        path: 'InfoLibrary',
                        element: <InfoLibrary />
                    },
                    {
                        path: 'ListenedMusic',
                        element: <ListenedMusic />
                    },
                    {
                        path: 'PlayLists',
                        element: <PlayLists />
                    },
                    {
                        path: 'InfoAlbums',
                        element: <InfoAlbums />
                    },
                    {
                        path: 'Artist',
                        element: <Artist />
                    },
                    {
                        path: 'Downloaded',
                        element: <Downloaded />
                    },
                    {
                        path: 'Followed',
                        element: <Followed />
                    }
                ]
            },
            //Route for Setting
            {
                path: '/ProfileEditPage',
                element: <ProfileEditPage />
            },
            {
                path: '/ChangePasswordPage',
                element: <ChangePasswordPage />
            },
            {
                path: '/ManagerHistory',
                element: <ManagerHistory />,
                children: [
                    {
                        index: true, // Default route
                        element: <ManagePayment />
                    },
                    {
                        path: 'PurchaseHistoryPage',
                        element: <PurchaseHistoryPage />
                    },
                    {
                        path: 'ManagePayment',
                        element: <ManagePayment />
                    }
                ]
            },
            {
                path: '/InvoiceDetail',
                element: <InvoiceDetail />
            },
            {
                path: '/SettingsPage',
                element: <SettingsPage />
            },
            {
                path: '/ContactForm',
                element: <ContactForm />
            },
            {
                path: '/AboutUs',
                element: <AboutUs />
            },
            {
                path: 'Privacy',
                element: <Privacy />
            },

            {
                path: '/Upgrade',
                element: <Upgrade />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/PasswordCode',
        element: <PasswordCode />
    },
    {
        path: '/PasswordReset',
        element: <PasswordReset />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
