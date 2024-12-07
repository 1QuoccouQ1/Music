import React, { useEffect, useState } from 'react';
import { API_URL } from '../services/apiService';

function Genre() {

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
  const [songs, setSongs] = useState({});

  
    function generateRandomColor() {
        const randomColor = () => Math.floor(Math.random() * 256);
        return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
      }

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch(`${API_URL}/quoc-gia`);
            const data = await response.json();
            setCountries(data); // Assuming the data is in an array format
          } catch (error) {
            console.error('Error fetching data:', error);
            
          }
        };
    
        fetchCountries();
      }, []);


    useEffect(() => {
        // Gọi API để lấy danh sách thể loại
        fetch(`${API_URL}/the-loai`)
        .then(response => response.json())
        .then(data => {
            setCategories(data);
            // Gọi API để lấy bài hát của từng thể loại
            data.forEach(category => {
            fetch(`${API_URL}/the-loai/${category.id}/bai-hat`)
                .then(response => response.json())
                .then(songData => {
                setSongs(prevSongs => ({
                    ...prevSongs,
                    [category.id]: songData
                }));
                setLoading(false);
                });
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
    }, []);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ); 
    }


    return ( <div className='bg-medium h-auto'>
        <section className="bg-medium w-full h-auto pt-16 text-white px-10">
      <h1 className="text-3xl font-medium mb-10">Thể Loại Được Nghe Nhiều Nhất</h1>
      <div className="flex items-center">
        {countries.map((country, index) => (
          <div key={index} className="w-1/4 px-2 relative">
            <div className={`w-full h-60 flex items-center justify-center rounded-lg cursor-pointer  opacity-60  `}
            style={{
              backgroundImage: `url(${country.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            
  }}
            >
            </div>
              <p className="text-3xl font-bold tracking-wide absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">{country.name_country
              }</p>
          </div>
        ))}
      </div>
    </section>
    {categories.filter(category => Array.isArray(songs[category.id]) && songs[category.id].length > 0)
        .map(category => (
        <section key={category.id} className="bg-medium w-full h-auto pt-16 text-white px-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium mb-16">{category.categorie_name}</h1>
            <div className="flex items-center text-slate-500 hover:text-white cursor-pointer duration-300">
              <p className="text-sm">Xem Thêm</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            {Array.isArray(songs[category.id]) && songs[category.id].length > 0 ? (
              songs[category.id] .slice(0, 5).map(song => (
                <div key={song.id} className="w-1/5 h-[300px] px-3 rounded-md">
                  <div style={{backgroundImage: `url(${song.song_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                   }} className='w-full h-full cursor-pointer rounded-md' />
                </div>
              ))
            ) : (
              <p className="w-full text-center">Không có bài hát</p> 
            )}
          </div>
        </section>
      ))}
    </div> );
}

export default Genre;