import React from "react";

function SongList({ songs }) {
    return (
        <table className="min-w-full text-white mt-4">
            <thead>
                <tr className="text-left border-b border-gray-600 ">
                    <th className="py-2 font-normal">#</th>
                    <th >Bài hát</th>
                    <th>Album</th>
                    <th>Lượt nghe</th>
                    <th className="text-right">Thời lượng</th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song, index) => (
                    <tr key={index} className="border-b-[10px] border-transparent  ">
                        <td className="py-2">{index + 1}</td>
                        <td className="flex items-center space-x-4">
                            <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-md" />
                            <div>
                                <p className="font-semibold">{song.title}</p>
                                <p className="text-gray-400 text-sm">{song.artist}</p>
                            </div>
                        </td>
                        <td>{song.album}</td>
                        <td>{song.plays}</td>
                        <td className="text-right">{song.duration}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SongList;
