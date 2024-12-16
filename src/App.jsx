import './App.css'
import { Outlet } from "react-router-dom";
import Sidebar from './component/Sidebar';
import Nav from './component/Nav';
import Footer from './component/Footer';
import SettingSidebar from './component/SettingSidebar';
import { UserProvider } from './ContextAPI/UserContext';
import ModalListen from './component/ModalListen';
import { ToastContainer } from 'react-toastify';
import AuthChecker from './component/checkAuth';



function App() {

  
  
  return (
    <>
     
      <AuthChecker/>
      <UserProvider>
        <div className="flex min-h-screen bg-[#f4f7fe] w-full select-none">
          <Sidebar></Sidebar>
          <SettingSidebar></SettingSidebar>
          <div className="lg:pl-56 pb-[204px]  relative bg-medium w-full select-none pr-1">
            <Nav></Nav>
            <div className="pt-[64px] w-full">
            <Outlet/>
            </div>
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
