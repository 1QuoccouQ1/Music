import { CirclePlus } from 'lucide-react';

function PlaylistDiv() {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-10  ">
        <div className="absolute top-1/2 right-1/2 -translate-x-full -translate-y-full w-[600px] h-[350px] rounded-md bg-red-500 z-20">
          <nav className="flex items-center px-7 py-4">
            <div className="text-4xl font-bold pr-5 border-r-1 border-slate-600 border-solid py-3">
              Play List
            </div>
            <div className="font-medium border-b-2 border-transparent border-solid hover:border-white duration-300 py-5 mx-3">
              Tất Cả
            </div>
            <div className="font-medium border-b-2 border-transparent border-solid hover:border-white duration-300 py-5 mx-3">
              Của Tôi
            </div>
          </nav>
          <div className="flex items-center h-[150px]">
            <div className="border-1 border-solid border-slate-800 rounded-md h-full w-[100px]">
              <CirclePlus />
              <p>Tạo playlist mới</p>
            </div>
            <div className="border-1 border-solid border-slate-800 rounded-md h-full w-[100px]">
                <img src="" alt="" className="w-full rounded-md" />
                <p className="font-medium ">Music</p>
                <p className="text-slate-700">Nguyễn Quốc</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaylistDiv;
