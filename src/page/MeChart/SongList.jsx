import React from "react";

function SongList() {
  const songs = [
    {
      id: 1,
      title: "Vừa Hận Vừa Yêu",
      artist: "Trung Tự",
      album: "Vừa Hận Vừa Yêu (Single)",
      time: "02:37",
    },
    {
      id: 2,
      title: "Là Tại Anh Sai",
      artist: "Châu Khải Phong",
      album: "Là Tại Anh Sai (Single)",
      time: "06:01",
    },
    {
      id: 3,
      title: "Hứa Đợi Nhưng Chẳng Tới",
      artist: "Lâm Triệu, Vương Thiên Tuấn",
      album: "Hứa Đợi Nhưng Chẳng Tới (Single)",
      time: "05:49",
    },
  ];

  return (
    <div className="p-4">
      <table className="min-w-full text-left text-white">
        <thead>
          <tr className="border-b">
            <th>#</th>
            <th>Bài hát</th>
            <th>Album</th>
            <th>Lượt nghe</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={song.id} className="border-b">
              <td>{index + 1}</td>
              <td>{song.title}</td>
              <td>{song.album}</td>
              <td>1 Ngày Trước</td>
              <td>{song.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SongList;
