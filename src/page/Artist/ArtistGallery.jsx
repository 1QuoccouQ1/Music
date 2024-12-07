import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import { API_URL } from "../../services/apiService";

function ArtistGallery() {
  const [artists, setArtists] = useState([]);

  
  useEffect(() => {
    fetch(`${API_URL}/ca-si`)
      .then(response => response.json())
      .then(data => {
        // Mapping the fetched data to match the format needed for ArtistCard
        const formattedArtists = data.map(artist => ({
          name: artist.singer_name || "Unknown Artist",
          profession: "Nghệ Sĩ",
          id: artist.id,
          imageUrl: artist.singer_image || "https://via.placeholder.com/150",
        }));
        setArtists(formattedArtists);
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu nghệ sĩ:', error));
  }, []);

 

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4 sm:px-8">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-8 pl-4 sm:pl-16">
        Top Nghệ Sĩ Phổ Biến
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-3 md:gap-5 lg:gap-auto justify-items-center">
        {artists.map((artist, index) => (
          <ArtistCard key={index} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default ArtistGallery;
