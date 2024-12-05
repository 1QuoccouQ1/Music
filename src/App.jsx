import './App.css'
import { Outlet } from "react-router-dom";
import Sidebar from './component/Sidebar';
import Nav from './component/Nav';
import Footer from './component/Footer';
import SettingSidebar from './component/SettingSidebar';
import { UserProvider } from './ContextAPI/UserContext';
import ModalListen from './component/ModalListen';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <UserProvider>
        <div className="flex h-auto bg-[#f4f7fe] w-full">
          <Sidebar></Sidebar>
          <SettingSidebar></SettingSidebar>
          <div className="lg:pl-64 pb-[204px] bg-medium w-full">
            <Nav></Nav>
            <Outlet />
          </div>
          <ModalListen />
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
