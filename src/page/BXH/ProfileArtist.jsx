import { Headphones ,UserRoundPlus,Play ,Check ,Heart,CirclePlus,Ellipsis,Dot,UserRound ,X ,Filter } from 'lucide-react';
import { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Facebook, Instagram, Twitter, Music } from "lucide-react"
import { useParams } from 'react-router-dom'; 

function ProfileArtist() {
    const [isFlowwing, setIsFlowwing] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isSelect, setIsSelect] = useState("1");
    const [artistData, setArtistData] = useState(null);

    const { id } = useParams(); 

    const handleFlowwing = () => {
        setIsFlowwing(!isFlowwing);
    }
   

    const handleModal  = () => {
        setIsModal(!isModal);
    }

    const handleSelect = (option) => {
      setIsSelect(option);
   };
    useEffect(() => {
        if (isModal) {
            // Khi Modal mở, chặn cuộn trang
            document.body.style.overflow = 'hidden';
        } else {
            // Khi Modal đóng, khôi phục lại khả năng cuộn trang
            document.body.style.overflow = 'auto';
        }
        return () => {
            // Dọn dẹp khi component unmount hoặc khi modal đóng
            document.body.style.overflow = 'auto';
        };
    }, [isModal]);

    useEffect(() => {
        console.log(`Fetching data for artist with ID: ${id}`);
    }, [id]);
    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const response = await fetch(`https://admin.soundwave.io.vn/api/ca-si/${id}`);
                
                const data = await response.json();
                console.log(data)
                setArtistData(data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        fetchArtistData();
    }, [id]);

    return ( <>
    <div className='bg-medium w-full h-auto pb-40'>
        <section className='w-full   pt-16  text-white px-5'>
            <div className="relative w-full h-[481px] z-10">
                <img src='../imgs/ab67618600001016bfff12c781d46c46b5268efb 1.png' className='rounded-t-xl h-full z-10'/>
                <div className="flex items-center justify-center absolute bottom-7 left-16 gap-8">
                    <img className='size-60 rounded-full border-1 border-black translate-y-1/4' src='../imgs/image (23).png' />
                    <div >
                        <p>Nghệ Sĩ Của Công Chúng</p>
                        <div className="flex items-center my-5">
                            <p className='text-7xl font-semibold '> Sơn Tùng MTP</p>
                            <img className='size-10 ml-5 ' src='../imgs/pepicons-pop_checkmark-filled.png'/>
                        </div>
                        <div className="flex items-center gap-7">
                            <p className='flex items-center  text-sm font-semibold gap-2'><Headphones  size={18}  className='text-red-600 '/> 1.584.659 người nghe hằng tháng</p>
                            <p className='flex  items-center  text-sm font-semibold gap-2 '><UserRoundPlus size={18}  className='text-red-600 '/> 5.940.438 người  theo dõi</p>
                        </div>
                        <div className='flex items-center gap-5 mt-5'>
                            <button className='flex items-center bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-2 box-border border-red-500 px-5 py-2 rounded-full font-semibold gap-1'>  <Play /> Phát tất cả</button>
                            {isFlowwing ? <button  onClick={handleFlowwing} className='flex items-center border-2 box-border border-red-500 px-4 py-2 rounded-full font-medium gap-1'>  <Check size={20} /> Đang theo dõi</button> : <button onClick={handleFlowwing} className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-4 py-2 rounded-full font-medium gap-1'> Theo dõi</button> }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex py-4 w-full px-72 gap-10 rounded-b-xl shadow-medium-xl  bg-slate-900'>
                <p onClick={() => handleSelect("1")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "1" ? "text-red-500" : " text-white"} `}>Nổi Bật</p>
                <p onClick={() => handleSelect("2")}  className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "2" ? "text-red-500" : " text-white"} `}>Bài hát</p>
                <p  onClick={() => handleSelect("3")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "3" ? "text-red-500" : " text-white"} `}>Single & EP</p>
                <p  onClick={() => handleSelect("4")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "4" ? "text-red-500" : " text-white"} `}>Album</p>
            </div>
        </section>
       {isSelect === "1" && <><section className='w-full text-white px-5 pt-10 flex '>
            <div className='flex w-2/3 flex-col gap-2' >
                <p className='text-right font-medium text-sm text-red-500 cursor-pointer mr-5'>Xem thêm</p>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Chúng Ta Của Tương Lai</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Chúng Ta Của Hiện Tại</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Âm Thầm Bên Em</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Muộn Rồi Mà Sao Còn</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
               
            </div>  
            <div className='flex w-1/3 '>
                <div className='w-full h-full p-3 relative ' >
                    <img className='rounded-xl w-full h-full shadow-2xl' src='../imgs/ab67618600001016bfff12c781d46c46b5268efb 1.png' />
                    <p className='absolute bottom-7 left-7 text-sm w-80  '>Nguyễn Thanh Tùng, sinh năm 1994, được biết đến với nghệ danh Sơn Tùng M-TP, là một ca sĩ, nhạc sĩ, nhà sản xuất và diễn viên người Việt Nam. Anh không chỉ được biết đến là một trong những nghệ sĩ Việt Nam... <span onClick={handleModal} className='font-semibold text-red-600  cursor-pointer'>Xem Thêm </span></p>
                </div>
            </div>
        </section>
        <section className="bg-medium pt-10 text-white px-10 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-xl font-medium mb-16">Single & EP</h1>
                 <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                        <p className="text-sm text-red-600 ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

                </div>
            </div>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper "
                
            >
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                </div>
                </SwiperSlide>
                
                
            
            </Swiper>
             
        </section>
        <section className="bg-medium pt-10 text-white px-10 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-xl font-medium mb-16">Album Hot</h1>
                 <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                        <p className="text-sm text-red-600 ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

                </div>
            </div>
             <div className="flex items-center ">
             {['Wean', 'Tăng Duy Tân', 'Wean', 'Wean'].map((item, index) => (
                <div className="w-1/6 mr-36 flex flex-col" key={index}>
                    <div className="w-full relative flex    ">
                        <img src="../imgs/image 8.png" className="  z-10" />
                        <img src="../imgs/Red And Black Modern Live Music Podcast Instagram Post (2) 3.png" className="absolute translate-x-1/2 w-full h-full" />
                    </div>
                    <p className="text-base font-medium ml-2 mt-1 mt-3 w-56 truncate">Sky Tour (Original Motion .....</p>
                    <p className="text-sm font-medium ml-2 text-slate-500">2022</p>
                </div>
            ))}
                
                
                
             </div>
        </section>
        <section className="bg-medium pt-10 text-white px-10 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-xl font-medium mb-16">Sơn Tùng M-TP trong loạt hit nổi bật</h1>
                 <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                        <p className="text-sm text-red-600 ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

                </div>
            </div>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper "
                
            >
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
            
            </Swiper>
             
        </section>
        <section className="bg-medium pt-10 text-white px-10 h-auto tracking-wide w-full max-w-full">
        <div className="flex items-center justify-between">
                 <h1 className="text-xl font-medium mb-16">Fan có thể thích</h1>
                 <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                        <p className="text-sm text-red-600 ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

                </div>
            </div>
            
            <Swiper
        spaceBetween={20}
        slidesPerView="auto" // Số item hiện trong 1 lần
        className="mySwiper "
        
      >
        <SwiperSlide style={{ width: 'auto' }} >
          <div className="text-center">
            <img src="../imgs/image (13).png" className="rounded-full mb-3  w-full" />
            <p className="font-medium mb-2 text-base">Sơn Tùng - MTP</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (14).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">RPT MCK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (15).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">VŨ.</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (16).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">KARIK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (17).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Bích Phương</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (18).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Đen Vâu</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }} >
          <div className="text-center">
            <img src="../imgs/image (13).png" className="rounded-full mb-3  w-full" />
            <p className="font-medium mb-2 text-base">Sơn Tùng - MTP</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (14).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">RPT MCK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (15).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">VŨ.</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (16).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">KARIK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (17).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Bích Phương</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (18).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Đen Vâu</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
            <button  className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15}  className='text-white '/> Theo dõi</button>

          </div>
        </SwiperSlide>
       
      </Swiper>
            
        </section> </> } 
        {isSelect === "2" && <> <section className='w-full text-white px-5 pt-10 flex '>
            <div className='flex w-full flex-col gap-2' >
                <div className='flex items-center justify-between border-b border-slate-500 pb-2'>
                   <h3 className='text-base font-medium'>Tất Cả Bài Hát</h3>
                   <p className='flex items-center font-medium text-sm  cursor-pointer mr-5'> <Filter size={15} className='mr-2'/> Tùy chọn</p>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/4 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Sơn Tùng M-TP</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Chúng Ta - Single</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/4 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/4 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Sơn Tùng M-TP</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Chúng Ta - Single</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/4 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/4 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Sơn Tùng M-TP</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Chúng Ta - Single</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/4 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/4 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Sơn Tùng M-TP</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Chúng Ta - Single</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/4 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/4 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Sơn Tùng M-TP</p>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <p>Chúng Ta - Single</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/4 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
            </div>  
        </section>
        <section className="bg-medium pt-10 text-white px-10 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-xl font-medium mb-16">Sơn Tùng M-TP trong loạt hit nổi bật</h1>
                 <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                        <p className="text-sm text-red-600 ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

                </div>
            </div>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper "
                
            >
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
            
            </Swiper>
             
        </section></>}
        {isSelect === "3" && <> <section className="bg-medium w-full h-auto pb-32  pt-5  text-white px-5 ">
             <div className="flex  w-full flex-wrap">
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
                <div className="w-1/6 px-2 mb-7  cursor-pointer">
                    <div className="text-center flex flex-col  items-start ">
                        <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                        <p className=''>Đừng Làm Trái Tim Anh đau</p>
                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot/>  Đĩa đơn </p>
                    </div>
                </div>
            </div>
        </section></> }
        {isSelect === "4" && <>
          <section className='w-full flex gap-10 items-center text-white px-7 pt-10 '>
            <div className='size-60 rounded-lg'>
              <img className='rounded-lg w-full h-full ' src='../imgs/412544823_377358094767954_6428436036322132060_n 2.png'/>
            </div>
            <div className='flex flex-col gap-14 '>
                <div className='flex flex-col gap-2 '>
                   <p className='text-xl font-semibold '>Sky Tour (Original Motion Picture Soundtrack)</p>
                   <p className='text-red-600 font-semibold '>Sơn Tùng M-TP</p>
                   <p className='text-sm text-slate-500'>POP · 2020</p>
                </div>
                <div className='flex text-sm cursor-pointer hover:opacity-90 items-center gap-2 font-medium py-1 px-3 rounded-lg bg-gradient-to-r from-[#FF553E] to-[#FF0065] w-max'> <Play size={15}/> Phát Nhạc</div>
            </div>
        </section>
        <section className='w-full text-white px-5 pt-10 flex '>
            <div className='flex w-full flex-col gap-2' >
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/2 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <p className='w-full truncate '>Sky Tour (Intro)</p>
                    </div>
                   
                    <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/2 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <p className='w-full truncate '>Sky Tour (Intro)</p>
                    </div>
                   
                    <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/2 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <p className='w-full truncate '>Sky Tour (Intro)</p>
                    </div>
                   
                    <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/2 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <p className='w-full truncate '>Sky Tour (Intro)</p>
                    </div>
                   
                    <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/2 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <p className='w-full truncate '>Sky Tour (Intro)</p>
                    </div>
                   
                    <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/2 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <p className='w-full truncate '>Sky Tour (Intro)</p>
                    </div>
                   
                    <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
            </div>  
        </section>
        <section className="bg-medium pt-10 text-white px-5 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-xl font-medium mb-7">Sơn Tùng M-TP Trong Loạt Hit Nổi Bật</h1>
            </div>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper "
                
            >
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-start ">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                    <p className='text-sm ml-2'>Nhạc gen Z</p>
                    <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                </div>
                </SwiperSlide>
            
            </Swiper>
             
        </section>
        </>}
    </div>
    {isModal && (<div className=" fixed top-0 bottom-0 right-0 left-0 z-20">
      <div className="bg-black h-[608px] bg-opacity-50 text-white  rounded-xl max-w-4xl w-full flex absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
        <div className="w-1/3 pr-4  p-6 relative flex flex-col  " style={{
                backgroundImage: `url('../imgs/image (23).png')`, // Đặt đường dẫn tới ảnh nền
                backgroundSize: 'cover',  // Để ảnh phủ kín
                backgroundPosition: 'center',  // Ảnh được căn giữa
            }}>
          <div className='bg-black w-full h-full absolute opacity-20 top-0 left-0 z-10 rounded-xl '></div>
          <div className="flex flex-col gap-4 items-start mt-auto ">
            <Facebook size={16} className="w-6 h-6" />
            <Instagram size={16} className="w-6 h-6" />
            <Twitter size={16} className="w-6 h-6" />
            <Music size={16} className="w-6 h-6" />
          </div>
        </div>
        <div className="w-2/3 px-4 pt-6 bg-white text-black rounded-r-xl">
          <p className="mb-4 font-bold">Nguyễn Thanh Tùng, sinh năm 1994, được biết đến với nghệ danh Sơn Tùng M-TP, là một ca sĩ, nhạc sĩ, nhà sản xuất âm nhạc và diễn viên người Việt Nam. Anh không chỉ được công nhận là một trong những nghệ sĩ thành công nhất Việt Nam và được mệnh danh là "Hoàng tử V-pop", mà còn là Chủ tịch của ba công ty do chính anh thành lập: M-TP Entertainment, M-TP Talent và M-TP & Friends. Anh đã đạt được nhiều thành tựu: giải thưởng MTV Europe Music Award, Mnet Asian Music Award, xuất hiện trong danh sách 30 Under 30 của Forbes Việt Nam năm 2018 và là nhạc sĩ Việt Nam đầu tiên lọt vào bảng xếp hạng Billboard Social 50. Cho đến nay, anh đã phát hành tổng cộng 25 ca khúc, như "Cơn mưa ngang qua", "Em của ngày hôm qua", "Âm thầm bên em", và nhiều bài khác nữa. Đĩa đơn "Chạy ngay đi" của anh được phát hành kèm theo video âm nhạc có sự góp mặt của nữ diễn viên Thái Lan Davika Hoorne, và với sự hợp tác cùng rapper Snoop Dogg, anh đã tạo nên bản hit lớn "Hãy trao cho anh". Sau khi phát hành ca khúc "Có chắc yêu là đây" vào năm 2020, bài hát đã trở thành video công chiếu trên YouTube được xem nhiều thứ 3 tại thời điểm đó với 902.000 người xem trực tiếp. Như chúng ta đều biết, âm nhạc không nghi ngờ gì nữa là cách dễ nhất để kết nối mọi người. Đối với Sơn Tùng M-TP, âm nhạc là tất cả những gì anh muốn mang đến cho thế giới xung quanh bằng cả trái tim và tâm hồn mình.</p>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <div className='border border-pink-600 p-2 rounded-full '>
                    <UserRound size={20} className='text-pink-600'/>
                </div>
                <button className="text-pink-600  px-4 py-2 rounded-s-full font-semibold">
                    Đăng Bởi Sơn Tùng M-TP
                </button>
            </div>
            <X onClick={handleModal} className='mr-4 hover:text-red-600 cursor-pointer'/>
          </div>
        </div>
      </div>
    </div>)}
    
    </> );
}

export default ProfileArtist;