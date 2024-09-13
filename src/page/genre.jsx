function Genre() {
    return ( <>
        <section className="bg-medium w-full h-[1000px]  pt-16  text-white px-10 ">
             <h1 className="text-3xl font-medium mb-10">Thể Loại Được Nghe Nhiều Nhất</h1>
             <div className="flex items-center ">
                <div className="w-1/4 px-2 ">
                        <div className=" w-full h-60 flex items-center justify-center bg-gradient-to-r from-[#FF4437] to-[#FF8148] rounded-lg">
                                <p className="text-3xl font-bold tracking-wide  ">VIỆT NAM </p>
                        </div>
                </div>
                <div className="w-1/4 px-2 ">
                        <div className=" w-full h-60 flex items-center justify-center bg-gradient-to-r from-[#F1566A] to-[#9E52E5] rounded-lg">
                                <p className="text-3xl font-bold tracking-wide  ">ÂU MỸ </p>
                        </div>
                </div>
                <div className="w-1/4 px-2 ">
                        <div className=" w-full h-60 flex items-center justify-center bg-gradient-to-r from-[#1D50B6] to-[#A566DA] rounded-lg">
                                <p className="text-3xl font-bold tracking-wide  ">K-POP </p>
                        </div>
                </div>
                <div className="w-1/4 px-2 ">
                        <div className=" w-full h-60 flex items-center justify-center bg-gradient-to-r from-[#DF4A4D] to-[#37313C] rounded-lg">
                                <p className="text-3xl font-bold tracking-wide  ">TRUNG QUỐC </p>
                        </div>
                </div>
             </div>
        </section>
    </> );
}

export default Genre;