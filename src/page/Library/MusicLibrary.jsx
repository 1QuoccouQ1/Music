import React from "react";
import AlbumArt from "./AlbumArt";
import SongList from "./SongList";
import Button from "../../component/Button";

function MusicLibrary() {
    
    


    const albums = [
        { title: "Sơn Tùng M-TP", imageUrl: "https://i.pinimg.com/474x/d9/b9/30/d9b930818774933bd36c0c9dbefae237.jpg" },
        { title: "RPT MCK", imageUrl: "https://i.pinimg.com/474x/d9/b9/30/d9b930818774933bd36c0c9dbefae237.jpg" },
        { title: "Bad Jisoo", imageUrl: "https://i.pinimg.com/474x/d9/b9/30/d9b930818774933bd36c0c9dbefae237.jpg" },
        { title: "Album 4", imageUrl: "https://i.pinimg.com/474x/d9/b9/30/d9b930818774933bd36c0c9dbefae237.jpg" },
        { title: "Album 5", imageUrl: "https://i.pinimg.com/474x/d9/b9/30/d9b930818774933bd36c0c9dbefae237.jpg" },
    ];

    const songs = [
        { 
            title: "Gió Tầng Nào Gặp Mây Tầng Đó", 
            artist: "Thành Đạt", 
            album: "Gió Tầng Nào Gặp Mây Tầng Đó (Single)", 
            duration: "05:01", 
            plays: "1 Ngày Trước", 
            cover: "https://i.pinimg.com/236x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg"
        },
        { 
            title: "Bài Hát 2", 
            artist: "RPT MCK", 
            album: "99%", 
            duration: "04:12", 
            plays: "2 Ngày Trước", 
            cover: "https://i.pinimg.com/236x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg"
        },
        
       
    ];

    return (
        <div className="bg-gray-900 min-h-screen">
             <div className="flex justify-between items-center p-6 bg-gray-900">
            <h1 className="text-white text-4xl font-bold">Thư viện</h1>
            <div className="flex space-x-4">
                <Button variant="primary" className="rounded-full" onClick={() => setActiveTab('/BXH')}>
                    Bài hát
                </Button>
                <Button variant="secondary">Album</Button>
                <Button variant="secondary">MV</Button>
                <Button variant="secondary">Playlist</Button>
            </div>
            
        </div>
            
            {/* Hiển thị album art */}
            <div className="flex space-x-6 justify-center mt-6">
                {albums.map((album, index) => (
                    <AlbumArt key={index} imageUrl={album.imageUrl} title={album.title} />
                ))}
            </div>

            {/* Danh sách bài hát */}
            <div className="px-6 mt-10">
                <SongList songs={songs} />
            </div>
        </div>
    );
}

export default MusicLibrary;
