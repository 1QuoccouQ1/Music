
function ListTopSongs() {


    return (
        <div className="bg-gradient-to-b from-orange-500 to-gray-900 text-white font-sans">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 p-8">
                <img 
                    src="https://via.placeholder.com/200" 
                    alt="Playlist Cover" 
                    className="w-48 h-48 rounded-lg" 
                />
                <div>
                    <p className="uppercase text-sm">Playlist</p>
                    <h1 className="text-6xl font-bold">Vũ. Radio</h1>
                    <p className="text-gray-300 mt-2">Với Da LAB, Thịnh Suy, Chillies và nhiều hơn nữa</p>
                    <p className="mt-1 flex items-center text-sm">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/174/174872.png" 
                            alt="Spotify" 
                            className="w-5 h-5 mr-2" 
                        />
                        Spotify · 20,257 lượt lưu · 50 bài hát, khoảng 3 giờ
                    </p>
                </div>
            </div>
    
            <div className="bg-black bg-opacity-30 rounded-lg p-4 mx-8">
                {/* Playlist Header */}
                <div className="grid grid-cols-12 text-gray-400 pb-2 border-b border-gray-700">
                    <p className="col-span-1">#</p>
                    <p className="col-span-6">Tiêu đề</p>
                    <p className="col-span-3">Album</p>
                    <p className="col-span-2">Thời gian</p>
                </div>
    
                {/* Playlist Items */}
                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-12 items-center text-white hover:bg-gray-800 rounded-lg p-2">
                        <p className="col-span-1">1</p>
                        <div className="col-span-6 flex items-center">
                            <img 
                                src="https://via.placeholder.com/40" 
                                alt="Song" 
                                className="w-10 h-10 mr-4 rounded" 
                            />
                            <div>
                                <p>Không Yêu Em Thì Yêu Ai?</p>
                                <p className="text-sm text-gray-400">Vũ., Low G</p>
                            </div>
                        </div>
                        <p className="col-span-3">Bảo Tàng Của Nuối Tiếc</p>
                        <p className="col-span-2">3:52</p>
                    </div>
    
                    <div className="grid grid-cols-12 items-center text-white hover:bg-gray-800 rounded-lg p-2">
                        <p className="col-span-1">2</p>
                        <div className="col-span-6 flex items-center">
                            <img 
                                src="https://via.placeholder.com/40" 
                                alt="Song" 
                                className="w-10 h-10 mr-4 rounded" 
                            />
                            <div>
                                <p>Mất Kết Nối</p>
                                <p className="text-sm text-gray-400">Dương Domic</p>
                            </div>
                        </div>
                        <p className="col-span-3">Dữ Liệu Quý</p>
                        <p className="col-span-2">3:27</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ListTopSongs;