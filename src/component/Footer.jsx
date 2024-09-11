import MusicPlayer from "./MusicPlayer";

function Footer() {
  return (
    <>
      <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FF553E] to-[#FF0065] p-3 text-white  w-[350px] rounded-r-lg">
          <div className="flex items-center ">
            <img className="inline-block" src="../imgs/Container.png" />
            <div className="mx-3">
              <p className="text-base ">LEGACY</p>
              <p className="text-sm text-slate-300">21 SAVAGE </p>
            </div>
          </div>
          <div className="size-5 border border-white  rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-center ">
           <MusicPlayer />
        </div>
        <div className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] text-white  h-[40px] px-2 py-2 rounded-full text-sm  flex items-center justify-center mr-5 ">
          <div className="border border-white size-4 flex items-center justify-center rounded-full mr-2 rotate-90">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>

          <p>Bài Tiếp Theo</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
