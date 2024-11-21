import './App.css'
import { Outlet } from "react-router-dom";
import Sidebar from './component/Sidebar';
import Nav from './component/Nav';
import Footer from './component/Footer';
import SettingSidebar from './component/SettingSidebar';
import { UserProvider } from './ContextAPI/UserContext';
import ModalListen from './component/ModalListen';

function App() {
  const isSetting = false;

  return (
    <>
      <UserProvider>
        <div className="flex h-auto bg-[#f4f7fe]">
          <Sidebar></Sidebar> 
          <SettingSidebar></SettingSidebar> 
          <div className="w-full ml-56 pb-[204px] bg-medium">
            <Nav></Nav>
            <Outlet   />
          </div>
          <ModalListen/>
         <Footer></Footer> 
        </div>
      </UserProvider>
    </>
  )
}

export default App
