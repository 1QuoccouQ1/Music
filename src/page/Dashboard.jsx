import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React, { useState } from "react";

function Dashboard() {

    const [activeTab, setActiveTab] = useState("vietnam");

  // Nội dung bảng xếp hạng của từng quốc gia
  const chartData = {
    vietnam: [
      { id: 1, song: "Nép Vào Nghe Anh Hát VN", artist: "Hoàng Dũng", img: "../imgs/image (6).png" },
      { id: 2, song: "Nép Vào Nghe Anh Hát VN", artist: "Hoàng Dũng", img: "../imgs/image (6).png" },
      { id: 3, song: "Nép Vào Nghe Anh Hát VN", artist: "Hoàng Dũng", img: "../imgs/image (6).png" },
      { id: 4, song: "Nép Vào Nghe Anh Hát VN", artist: "Hoàng Dũng", img: "../imgs/image (6).png" },
      { id: 5, song: "Nép Vào Nghe Anh Hát VN", artist: "Hoàng Dũng", img: "../imgs/image (6).png" },
      // Thêm dữ liệu khác nếu cần
    ],
    europe: [
      { id: 1, song: "Song Europe 1 europe ", artist: "Artist Europe 1", img: "../imgs/image (6).png" },
      { id: 2, song: "Song Europe 2 europe", artist: "Artist Europe 2", img: "../imgs/image (6).png" },
      { id: 3, song: "Song Europe 2 europe", artist: "Artist Europe 2", img: "../imgs/image (6).png" },
      { id: 4, song: "Song Europe 2 europe" , artist: "Artist Europe 2", img: "../imgs/image (6).png" },
      { id: 5, song: "Song Europe 2 europe", artist: "Artist Europe 2", img: "../imgs/image (6).png" },
      // Thêm dữ liệu khác nếu cần
    ],
    korea: [
      { id: 1, song: "Song Korea 1korea", artist: "Artist Korea 1", img: "../imgs/image (6).png" },
      { id: 2, song: "Song Korea 2 korea", artist: "Artist Korea 2", img: "../imgs/image (6).png" },
      { id: 3, song: "Song Korea 2 korea", artist: "Artist Korea 2", img: "../imgs/image (6).png" },
      { id: 4, song: "Song Korea 2 korea", artist: "Artist Korea 2", img: "../imgs/image (6).png" },
      { id: 5, song: "Song Korea 2 korea", artist: "Artist Korea 2", img: "../imgs/image (6).png" },
      { id: 6, song: "Song Korea 2 korea", artist: "Artist Korea 2", img: "../imgs/image (6).png" },
      { id: 7, song: "Song Korea 2 korea", artist: "Artist Korea 2", img: "../imgs/image (6).png" },
    ],
    usa: [
        { id: 1, song: "Song USA 1 usa", artist: "Artist USA 1", img: "../imgs/image (6).png" },
      { id: 2, song: "Song USA 2 usa", artist: "Artist USA 2", img: "../imgs/image (6).png" },
      { id: 3, song: "Song USA 2 usa", artist: "Artist USA 2", img: "../imgs/image (6).png" },
      { id: 4, song: "Song USA 2 usa", artist: "Artist USA 2", img: "../imgs/image (6).png" },
      { id: 5, song: "Song USA 2 usa", artist: "Artist USA 2", img: "../imgs/image (6).png" },
      { id: 6, song: "Song USA 2 usa", artist: "Artist USA 2", img: "../imgs/image (6).png" },
      { id: 7, song: "Song USA 2 usa", artist: "Artist USA 2", img: "../imgs/image (6).png" },
    ],
  };

// Hàm render dữ liệu bảng xếp hạng theo quốc gia
const renderChart = () => {
    const data = chartData[activeTab] || [];
    return data.map((item, index) => (
      <div className="w-1/3 pr-10 mb-10" key={item.id}>
        <div className="w-full flex items-center border-b border-slate-700 pb-2 cursor-pointer">
          <p className="text-xl text-slate-700 font-medium p-6">{index + 1}</p>
          <img src={item.img} alt={item.song} />
          <p className="text-base ml-3">
            {item.song}
            <br />
            <span className="text-xs text-slate-600">{item.artist}</span>
          </p>
        </div>
      </div>
    ));
  };
    return ( <>
        <section className="bg-medium w-full h-[1000px] text-white "  >
            <div className="relative  ">
                 <img src="../imgs/Group 92.png"/> 
                <div className="absolute top-1/2 px-10 w-full">
                    <h1 className="text-7xl font-medium  w-2/4 pr-10 italic tracking-wide">Các bản hit cuối tuần này là gì?</h1>
                    <div className="flex items-center justify-start my-10  ">
                        <div className="text-white py-2 px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer">Phát Tất Cả </div>
                        <div className="p-0.5 bg-stone-950/15 rounded mx-4 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>

                        </div>
                        <div className="flex items-center ">
                            <div className="p-4  bg-stone-950/15  rounded-full mx-4 cursor-pointer text-red-600 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>
                            </div>
                            <p className="text-sm tracking-wider">Chia Sẻ(191)</p>

                        </div>
                        <div className="flex items-center ">
                            <div className="p-4  bg-stone-950/15  rounded-full mx-4 cursor-pointer text-red-600 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

                            </div>
                            <p className="text-sm tracking-wider">Bình Luận(81)</p>

                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="w-1/3 px-5 relative ">
                            <img className="" src="../imgs/image.png"/>
                            <p className="absolute top-2 left-7 text-black bg-yellow-500 py-1 rounded-md font-bold text-sm  px-4">Top Thịnh Hành </p>
                            <div className="absolute bottom-2 left-7 bg-stone-950/65 p-1 flex items-center w-2/3">
                                <img className="" src="../imgs/image (2).png"/>
                                <p className="mx-3 font-medium tracking-wide">Cắt Đôi Nỗi Sầu <br/> <span className="text-sm font-light">Tăng Duy Tân</span></p>
                             </div>
                        </div>
                        <div className="w-1/3 px-5 relative ">
                            <img className="" src="../imgs/image (4).png"/>
                            <p className="absolute top-2 left-7 text-black bg-white py-1 rounded-md font-bold text-sm  px-4">Top Lượt Nghe </p>
                            <div className="absolute bottom-2 left-7 bg-stone-950/65 p-1 flex items-center w-2/3">
                                <img className="" src="../imgs/image (3).png"/>
                                <p className="mx-3 font-medium tracking-wide">Feel Something <br/> <span className="text-sm font-light">Illenium,Excision,I Prevail</span></p>
                             </div>
                        </div>
                        <div className="w-1/3 px-5 relative ">
                            <img className="" src="../imgs/image (1).png"/>
                            <p className="absolute top-2 left-7 text-black bg-white py-1 rounded-md font-bold text-sm  px-4">Top Yêu Thích </p>
                            <div className="absolute bottom-2 left-7 bg-stone-950/65 p-1 flex items-center w-2/3">
                                <img className="" src="../imgs/image (5).png"/>
                                <p className="mx-3 font-medium tracking-wide">Jewel <br/> <span className="text-sm font-light">RL Grime, ISOxo</span></p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className=" bg-medium pt-24 text-white px-10 h-auto" >
            <h1 className="text-3xl font-medium ">Bảng Xếp Hạng Hàng Tuần </h1>
            <div className="flex items-center justify-between my-7">
                <div className="flex items-center text-sm tracking-wide ">
                     <p
            className={`cursor-pointer duration-300 py-2 px-8 rounded-full mr-10 ${activeTab === "vietnam" ? "bg-gradient-to-r from-[#FF0065] to-[#FF553E]" : "bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]"}`}
            onClick={() => setActiveTab("vietnam")}
          >
            Việt Nam
          </p>
          <p
            className={`cursor-pointer duration-300 py-2 px-8 rounded-full mr-10 ${activeTab === "europe" ? "bg-gradient-to-r from-[#FF0065] to-[#FF553E]" : "bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]"}`}
            onClick={() => setActiveTab("europe")}
          >
            Âu Mỹ
          </p>
          <p
            className={`cursor-pointer duration-300 py-2 px-8 rounded-full mr-10 ${activeTab === "korea" ? "bg-gradient-to-r from-[#FF0065] to-[#FF553E]" : "bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]"}`}
            onClick={() => setActiveTab("korea")}
          >
            Hàn Quốc
          </p>
          <p
            className={`cursor-pointer duration-300 py-2 px-8 rounded-full ${activeTab === "usa" ? "bg-gradient-to-r from-[#FF0065] to-[#FF553E]" : "bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]"}`}
            onClick={() => setActiveTab("usa")}
          >
            Hoa Kỳ
          </p>
                </div>
                <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
                        <p className="text-sm  ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

                </div>
            </div>
            <div className="flex items-center mt-16 flex-wrap ">
            {renderChart()}
            </div>
        </section>
        <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide">
             <h1 className="text-3xl font-medium mb-16">Nhạc Nghe Gần Đây</h1>
             <Swiper
                spaceBetween={30}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper "
                
            >
                <SwiperSlide style={{ width: 'auto' }} >
                <div className="text-center flex flex-col  items-center">
                    <img src="../imgs/image (7).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center  w-[150px] truncate">GOLDEN</p>
                    <p className="text-sm text-slate-700">Jung Kook</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                     <img src="../imgs/image (8).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center w-[150px] truncate ">MUSE</p>
                    <p className="text-sm text-slate-700">Jimin</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center ">
                <img src="../imgs/image (9).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center w-[150px] truncate ">Ai Cũng Phải Bắt Đầu Từ Đâu Đó</p>
                    <p className="text-sm text-slate-700">Hiếu Thứ Hai</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                <img src="../imgs/image (10).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center  w-[150px] truncate">D-Day</p>
                    <p className="text-sm text-slate-700">Agust D</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                     <img src="../imgs/image (11).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center  w-[150px] truncate">99%</p>
                    <p className="text-sm text-slate-700">MCK</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                     <img src="../imgs/image (12).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center  w-[150px] truncate">Anh Trai “Say HI”</p>
                    <p className="text-sm text-slate-700">Anh Trai “Say HI”</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                     <img src="../imgs/image (12).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center w-[150px] truncate ">Anh Trai “Say HI”</p>
                    <p className="text-sm text-slate-700">Anh Trai “Say HI”</p>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                     <img src="../imgs/image (12).png" className="rounded-full mb-7 w-full "/>
                    <p className="font-medium mb-2 text-base  text-center w-[150px] truncate ">Anh Trai “Say HI”</p>
                    <p className="text-sm text-slate-700">Anh Trai “Say HI”</p>
                </div>
                </SwiperSlide>
            
            </Swiper>
            
        </section>
        <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide w-full max-w-full">
            <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-medium mb-16">Top Nghệ Sĩ Được Yêu Thích</h1>
                 <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
                        <p className="text-sm  ">Xem Thêm </p>
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
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (14).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">RPT MCK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (15).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">VŨ.</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (16).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">KARIK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (17).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Bích Phương</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (18).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Đen Vâu</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }} >
          <div className="text-center">
            <img src="../imgs/image (13).png" className="rounded-full mb-3  w-full" />
            <p className="font-medium mb-2 text-base">Sơn Tùng - MTP</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (14).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">RPT MCK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (15).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">VŨ.</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (16).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">KARIK</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (17).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Bích Phương</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: 'auto' }}>
          <div className="text-center">
            <img src="../imgs/image (18).png" className="rounded-full mb-3 w-full" />
            <p className="font-medium mb-2 text-base">Đen Vâu</p>
            <p className="text-sm text-slate-700">Nghệ Sĩ</p>
          </div>
        </SwiperSlide>
       
      </Swiper>
            
        </section>
        <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-medium mb-16">Album Hot</h1>
                 <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
                        <p className="text-sm  ">Xem Thêm </p>
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
                    <p className="text-lg font-medium ml-24 mt-5 mt-3">{item}</p>
                </div>
            ))}
                
                
                
             </div>
        </section>
        <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-medium mb-16">Chill</h1>
                 <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
                        <p className="text-sm  ">Xem Thêm </p>
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
                <div className="text-center flex flex-col  items-center">
                    <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                    <img src="../imgs/Red And Black Modern Live Music Podcast Instagram Post (3) 2.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center ">
                    <img src="../imgs/image 16.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                     <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                    <img src="../imgs/Red And Black Modern Live Music Podcast Instagram Post (3) 2.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                  <img src="../imgs/image 16.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                  <img src="../imgs/image 16.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                <div className="text-center flex flex-col  items-center">
                  <img src="../imgs/image 16.png" className=" mb-3 "/>
                </div>
                </SwiperSlide>
                
            
            </Swiper>
             
        </section>
        <section className="bg-medium pt-20 text-white px-10 h-auto pb-48 tracking-wide">
            <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-medium mb-16">Thể Loại</h1>
                 <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
                        <p className="text-sm  ">Xem Thêm </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

                </div>
            </div>
             <div className="flex items-center  flex-wrap "> 
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">WORLD MUSIC</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#91ed86] to-[#f7458c] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">VIỆT NAM </p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#ad83f0] to-[#16de3e] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">ÂU MỸ</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#d6e785] to-[#d62f72] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">HOA KỲ</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#a3cc7e] to-[#1fe3f5] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">TRUNG QUỐC</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#75c17d] to-[#c12424] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">K-POP</p>
                    </div>
                </div>
                
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#63b278] to-[#d92f73] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">LO-FI</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#e4e78c] to-[#235bdf] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">TRỮ TÌNH</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#6db0b1] to-[#e7da22] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">RAP VIỆT </p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#e59085] to-[#23c479] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">REMIX</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#539c62] to-[#4a0c25] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">ROCK</p>
                    </div>
                </div>
                <div className="w-1/6 pr-3 pb-3">
                    <div className="w-full bg-gradient-to-r from-[#79cdc3] to-[#f118df] h-64 rounded-xl flex items-center justify-center">
                        {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 "/> */}
                        <p className="font-bold text-2xl ">THƯ GIÃN</p>
                    </div>
                </div>
             </div>
        </section>
    </> );
}

export default Dashboard;