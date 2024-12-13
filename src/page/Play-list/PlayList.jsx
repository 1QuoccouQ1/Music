import { CirclePlus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

function PlaylistDiv() {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-20  flex items-center justify-center text-white bg-slate-800/40 ">
        <div className="w-[600px] h-[350px] rounded-md bg-medium z-20">
          <nav className="flex items-center px-7 py-4">
            <div className="text-2xl font-bold pr-5 border-r-1 border-slate-600 border-solid py-3">
              Play List
            </div>
            <div className="font-medium border-b-2 border-transparent border-solid hover:border-white duration-300 py-4 mx-3 cursor-pointer">
              Tất Cả
            </div>
            <div className="font-medium border-b-2 border-transparent border-solid hover:border-white duration-300 py-4 mx-3 cursor-pointer">
              Của Tôi
            </div>
          </nav>
          <div className="flex items-center h-[250px] px-7 py-4">
            <div className="mr-3 flex-none border border-solid border-slate-200 rounded-md h-full w-[170px] flex flex-col items-center justify-center space-y-4 hover:border-red-400 cursor-pointer group duration-300">
              <CirclePlus className="group-hover:text-red-400" />
              <p className="text-sm truncate group-hover:text-red-400">
                Tạo playlist mới
              </p>
            </div>
            <Swiper
              spaceBetween={20}
              slidesPerView="auto" // Số item hiện trong 1 lần
              className="mySwiper "
            >
              <SwiperSlide style={{ width: "auto" }}>
                <div className=" rounded-md h-full w-[170px] mx-5">
                  <img
                    src="https://soundwave2.s3.amazonaws.com/song_image/1733883386_thang_tu_la_loi_noi_doi_cua_em.jpg"
                    alt=""
                    className="w-full rounded-md"
                  />
                  <p className="font-medium text-sm mt-2 truncate">Music</p>
                  <p className="text-slate-700 text-sm truncate">Nguyễn Quốc</p>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: "auto" }}>
                <div className=" rounded-md h-full w-[170px] mx-5">
                  <img
                    src="https://soundwave2.s3.amazonaws.com/song_image/1733883386_thang_tu_la_loi_noi_doi_cua_em.jpg"
                    alt=""
                    className="w-full rounded-md"
                  />
                  <p className="font-medium text-sm mt-2 truncate">Music</p>
                  <p className="text-slate-700 text-sm truncate">Nguyễn Quốc</p>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: "auto" }}>
                <div className=" rounded-md h-full w-[170px] mx-5">
                  <img
                    src="https://soundwave2.s3.amazonaws.com/song_image/1733883386_thang_tu_la_loi_noi_doi_cua_em.jpg"
                    alt=""
                    className="w-full rounded-md"
                  />
                  <p className="font-medium text-sm mt-2 truncate">Music</p>
                  <p className="text-slate-700 text-sm truncate">Nguyễn Quốc</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaylistDiv;
