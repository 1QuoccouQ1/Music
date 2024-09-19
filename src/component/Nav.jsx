
import InputSearch from './InputSearch';

function Nav() {

   

    return ( <>
       <div className="flex justify-between  w-auto h-auto flex-shrink py-4   h-[90px] px-10    bg-medium  text-zinc-700 flex items-center justify-center">
              <InputSearch></InputSearch>
              <div className="relative flex  text-left">
                <a href='/register'>
                  <div className='text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer'>Đăng Ký </div>
                </a>
                <a href='/login'>
                  <div className='text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer'>Đăng Nhập </div>
                </a>
              </div>
            </div>
    </>  );
}

export default Nav;