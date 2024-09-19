import './App.css'
import { Outlet } from "react-router-dom";
import Sidebar from './component/Sidebar';
import Nav from './component/Nav';
import Footer from './component/Footer';

function App() {
  return (
    <>
      <div className="flex h-screen bg-[#f4f7fe]">
        <Sidebar></Sidebar>
        <div className="w-full ml-56 mb-[104px]">
          <Nav></Nav>
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
