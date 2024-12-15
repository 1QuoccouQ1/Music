import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { UserContext } from "../../ContextAPI/UserContext";
import axios from "axios";

function Country() {
    const [countries, setCountries] = useState([]); // Dữ liệu quốc gia từ API /quoc-gia
    const [activeTab, setActiveTab] = useState(1); // Quốc gia đang được chọn
    const [songs, setSongs] = useState([]); // Danh sách bài hát của quốc gia đang chọn
    const { handleAddSong, handleClick } = useContext(UserContext);

    // Lấy danh sách quốc gia khi component được render lần đầu
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${API_URL}/quoc-gia`); // Gọi API /quoc-gia
                setCountries(response.data); // Lưu danh sách quốc gia vào state
                if (response.data.length > 0) {
                    setActiveTab(response.data[0].id); // Đặt quốc gia đầu tiên làm mặc định
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Lấy danh sách bài hát khi activeTab thay đổi
    useEffect(() => {
        if (activeTab) {
            const fetchSongs = async () => {
                try {
                    const response = await axios.get(
                        `${API_URL}/quoc-gia/${activeTab}/bai-hat`
                    ); // Gọi API /bai-hat với ID quốc gia
                    if (response.status === 200) {
                        setSongs(response.data); // Lưu danh sách bài hát vào state
                    } else {
                        setSongs([]); // Nếu không có bài hát nào thì set state rỗng
                    }
                } catch (error) {
                    setSongs([]);
                    console.error("Error fetching songs:", error);
                } finally {

                }
            };
            fetchSongs();
        }
    }, [activeTab]);

    // Hàm render danh sách quốc gia
    const renderCountries = () => {
        return countries.map((country) => (
            <p
                key={country.id}
                className={`cursor-pointer duration-300 truncate py-2 my-2 px-2 lg:px-4 lg:px-8 rounded-full mr-2 lg:mr-6 lg:mr-10 ${activeTab === country.id
                    ? "bg-gradient-to-r from-[#FF0065] to-[#FF553E]"
                    : "bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]"
                    }`}
                onClick={() => setActiveTab(country.id)} // Đổi quốc gia khi nhấn vào tab
            >
                {country.name_country}
            </p>
        ));
    };

    // Hàm render danh sách bài hát
    const renderSongs = () => {
        if (songs.length === 0) {
            return <p>Không có bài hát nào được tìm thấy.</p>;
        }
        const limitedSongs = songs.slice(0, 12);
        return limitedSongs.map((song, index) => (
            <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 2xl:w-1/4 pr-1 sm:pr-5 lg:pr-10 mb-1 sm:mb-5 md:mb-10 " key={song.id}>
                <div
                    className="w-full flex items-center border-b border-slate-700 sm:pb-2 cursor-pointer hover:bg-gray-800"
                    onDoubleClick={() => { handleAddSong("song", song.id) }}
                    onClick={() => handleClick(song.id)}
                >
                    <p className="text-lg sm:text-xl text-slate-700 font-medium p-3 sm:p-6">{index + 1}</p>
                    <img
                        className="size-10 sm:size-16 rounded-md"
                        src={song.song_image}
                        alt={song.song_name}
                    />
                    <p className="text-base ml-3 truncate">
                        {song.song_name}
                        <br />
                        <span className="text-xs text-slate-600 truncate hover:underline">{song.singer_name}</span>
                    </p>
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className="flex items-center justify-between my-2 lg:my-7">
                <div className="flex items-center flex-wrap text-sm tracking-wide ">
                    {renderCountries()}
                </div>
                <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
                    <Link to={"/Genre"}><p className="text-sm cursor-pointer truncate">Xem Thêm </p></Link>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex items-center mt-2 lg:mt-16 flex-wrap ">
                {renderSongs()}
            </div>
        </>
    );

}
export default Country;