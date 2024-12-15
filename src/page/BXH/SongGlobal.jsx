import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Play } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../ContextAPI/UserContext";
import { API_URL } from "../../services/apiService";
import ListSongs from '../Genre/ListSongs.jsx';

function SongGlobal() {
    const [countries, setCountries] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { handleFetchSongs } = useContext(UserContext);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    API_URL+'/quoc-gia'
                );
                if (response.status === 200) {
                    setCountries(response.data);
                } else {
                    throw new Error('Không thể lấy dữ liệu quốc gia');
                }
            } catch (err) {
                setError(err.message);
                console.error('Lỗi khi gọi API:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (!id) return;
                setLoading(true);
                const response = await axios.get(
                    `${API_URL}/quoc-gia/${id}/bai-hat`
                );
                if (response.status === 200) {
                    setSongs(response.data);
                } else {
                    setSongs([]);
                }
            } catch (err) {
                setError(err.message);
                console.error('Lỗi khi gọi API bài hát:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return <p className='text-center mt-10 text-red-500'>{error}</p>;
    }

    const currentCountry = countries.find(
        country => country.id === parseInt(id)
    );

    return (
        <div className='bg-medium w-full h-auto pb-40'>
            {/* Quốc gia */}
            {currentCountry && (
                <div className='relative w-full px-1 h-[200px] sm:h-[400px] lg:h-[500px]'>
                    <img
                        src={currentCountry.background || ''}
                        className='rounded-t-xl h-full w-full object-cover'
                        alt={currentCountry.name_country || 'Quốc gia'}
                    />
                    <div className='flex flex-col items-center justify-center absolute bottom-7 px-4 md:left-16 gap-4 md:gap-8'>
                        <div>
                            <div className='flex items-center my-5'>
                                <p className='text-3xl lg:text-5xl font-semibold text-white'>
                                    {currentCountry.name_country || 'Quốc Gia'}
                                </p>
                                <img
                                    className='w-6 h-6 ml-2'
                                    src='../imgs/pepicons-pop_checkmark-filled.png'
                                    alt='Checkmark'
                                />
                            </div>
                            <div className="flex items-center text-white py-2 px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer" onClick={() => { handleFetchSongs("quocgia", currentCountry.id) }}>
                                <Play size={18} className="mr-2" />
                                Phát Tất Cả
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bảng bài hát */}
            {songs.length > 0 ? (
                <ListSongs
                    songs={songs}
                />
            ) : (
                <p className='text-center text-gray-400 mt-10'>
                    Không có bài hát nào để hiển thị.
                </p>
            )}

            <ToastContainer />
        </div>
    );
}

export default SongGlobal;
