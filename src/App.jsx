import './App.css'
import { Outlet } from "react-router-dom";
import Sidebar from './component/Sidebar';
import Nav from './component/Nav';
import Footer from './component/Footer';
import SettingSidebar from './component/SettingSidebar';

function App() {
  const isSetting = true;
  return (
    <>

      <div className="flex h-screen bg-[#f4f7fe]">
        {isSetting ? <Sidebar></Sidebar> :<SettingSidebar></SettingSidebar> }
        <div className="w-full ml-56 mb-[104px]">
          <Nav></Nav>
          <Outlet />
        </div>
        {isSetting ? <Footer></Footer> : <></>  }
      </div>
    </>
  )
}

export default App
