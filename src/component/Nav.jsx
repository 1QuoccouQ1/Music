
import InputSearch from './InputSearch';

function Nav() {

   

    return ( <>
       <div className="flex justify-between  w-auto h-auto flex-shrink py-4  mb-3 h-[90px] px-10    bg-medium  text-zinc-700 flex items-center justify-center">
              {/* <h1 className='font-medium text-2xl '>Quản Lý Chi Tiêu</h1> */}
              <InputSearch></InputSearch>
              <div className="relative flex  text-left">
                <div className='text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full '>Đăng Ký </div>
                <div className='text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full '>Đăng Nhập </div>
              </div>
            </div>
    </>  );
}

export default Nav;