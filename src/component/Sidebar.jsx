import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ReplayIcon from '@mui/icons-material/Replay';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

function Sidebar() {
  return (
    <>
      <aside className="w-56 max-w-64 bg-sidebar px-6 py-3 h-full fixed ">
        <div className="space-y-4 h-auto">
          <a href="/" className="flex justify-center">
            <img src="../imgs/Music Brand and App Logo 1.png" />
          </a>
          <nav className="space-y-1  h-auto tracking-wide">
            <div className="flex flex-col  justify-between h-auto">
              <div className="text-sm ">
                <a
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3  hover:shadow-lg rounded-lg duration-300"
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>


                                    <span className=' '>Trang Chủ</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3  hover:shadow-lg rounded-lg duration-300'
                                    href='/BXH'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='size-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'
                                        />
                                    </svg>

                                    <span className=' '>BXH Hàng Tuần</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3  hover:shadow-lg rounded-lg duration-300'
                                    href='/Artist'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='size-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z'
                                        />
                                    </svg>

                                    <span className=' '>Top Nghệ Sĩ </span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3  hover:shadow-lg rounded-lg duration-300'
                                    href='/Genre'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='size-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                                        />
                                    </svg>

                                    <span className=' '>Thể Loại</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3  hover:shadow-lg rounded-lg duration-300'
                                    href='/Albums'
                                >
                                    <QueueMusicIcon />

                                    <span className=' '>Album</span>
                                </a>
                               
                <a
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3  hover:shadow-lg rounded-lg duration-300"
                  href="Information"
                >
                  
                  <PlaylistPlayIcon />

                  <span className=" ">Nhạc của Tôi</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
