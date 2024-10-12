import React, {useState} from "react";
import ArtistCard from "./ArtistCard";



function ArtistGallery() {
    const [artists, setArtists] = useState([
            { name: "Đen Vâu", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "Sơn Tùng - MTP", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },
            { name: "RPT MCK", profession: "Nghệ Sĩ", imageUrl: "https://i.pinimg.com/736x/3d/ab/91/3dab91223b7880e03837376e5d5c7c96.jpg" },

        
        
    ]);

    // Lấy dữ liệu từ API mẫu 
    // useEffect(() => {
    //     fetch('http://localhost:5000/api/artists')
    //       .then(response => response.json())
    //       .then(data => setArtists(data))
    //       .catch(error => console.error('Lỗi khi lấy dữ liệu nghệ sĩ:', error));
    //   }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-10">
    <h2 className="text-white text-xl md:text-4xl font-bold mb-8 pl-16">Top Nghệ Sĩ Phổ Biến</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 justify-items-center mx-8">
      {artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </div>
  </div>
  );
}
export default ArtistGallery;