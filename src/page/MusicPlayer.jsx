import React, { useState, useRef } from 'react';

const MusicPlayer = () => {
    const [tracks] = useState([
        { title: 'Màu Thu Màng Giấc Mơ Quay Về', src: 'track1.mp3' },
        { title: 'Vẫn Nguyên Vẹn Như Hôm Nào', src: 'track2.mp3' },
        { title: 'Lá Bay Theo Gió Xôn Xao', src: 'track3.mp3' },
        { title: 'Chốn Xưa Em Chờ (Chốn Xưa Em Chờ)', src: 'track4.mp3' },
        { title: 'Đoạn Đường Ngày Nào Nơi Ta Từng Đón Đưa', src: 'track5.mp3' },
        { title: 'Còn Vấn Vương Không Phải Mơ', src: 'track6.mp3' },
        { title: 'Giấu Yêu Thương Trong Vấn Thơ', src: 'track7.mp3' }
    ]);

    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const selectTrack = (index) => {
        setCurrentTrack(index);
        audioRef.current.src = tracks[index].src;
        setIsPlaying(false);
    };

    return (
        <div className="flex justify-between bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <div className="w-1/3">
                <img src="album-cover.jpg" alt="Album cover" className="rounded-lg" />
            </div>

            <div className="w-2/3 pl-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">{tracks[currentTrack].title}</h2>
                </div>

                <div className="flex items-center mb-6">
                    <audio ref={audioRef} src={tracks[currentTrack].src}></audio>
                    <button
                        className={`px-6 py-2 rounded-lg text-white ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>

                <div className="space-y-4">
                    {tracks.map((track, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer py-2 hover:text-red-500 transition ${
                                currentTrack === index ? 'text-red-500' : ''
                            }`}
                            onClick={() => selectTrack(index)}
                        >
                            {track.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
