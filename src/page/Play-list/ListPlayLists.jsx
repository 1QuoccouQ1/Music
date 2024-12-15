import { useParams } from "react-router";
import { API_URL } from '../../services/apiService';
import { useContext, useState, useEffect } from "react";
import ListSongs from "../Genre/ListSongs";
import { Play } from "lucide-react";
import { UserContext } from "../../ContextAPI/UserContext";


function ListPlayLists() {
    const { param } = useParams();
    const [listSongs, setListSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { handleFetchSongs } = useContext(UserContext);

    const fetchSongs = async (param) => {
        try {
            let fetchedSongs;
            switch (param) {
                case "trending":
                    fetchedSongs = await fetch(`${API_URL}/trending`);
                    break;
                case "listen":
                    fetchedSongs = await fetch(`${API_URL}/top-listen`);
                    break;
                case "like":
                    fetchedSongs = await fetch(`${API_URL}/top-like`);
                    break;
                default:
                    throw new Error("Invalid type parameter");
            }
            const dataList = await fetchedSongs.json();
            if (fetchedSongs.status == false) {
                console.error('Error fetching artist data:', dataList.message);

            } else {
                setListSongs(dataList); // Cập nhật state `artist`
                setIsLoading(false);
            }

        } catch (err) {
            console.error("Error fetching songs:", err);
        }
    }

    useEffect(() => {
        fetchSongs(param);
    }, [param]);

    const gradients = {
        trending: "bg-gradient-to-b from-orange-500 to-gray-900",
        listen: "bg-gradient-to-b from-green-500 to-gray-900",
        like: "bg-gradient-to-b from-purple-500 to-gray-900",
    };
    const images = {
        trending: "../imgs/image.png",
        listen: "../imgs/image (1).png",
        like: "../imgs/image (4).png",
    };
    const values = {
        trending: "Top thịnh hành",
        listen: "Top lượt nghe",
        like: "Top lượt thích",
    };
    // Lấy gradient dựa trên giá trị của param, nếu không có thì mặc định là 'trending'
    const selectedGradient = gradients[param] || gradients.trending;
    const selectedImage = images[param] || images.trending;
    const selectedValue = values[param] || values.trending;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    return (
        <>
            <div className={`${selectedGradient} text-white font-sans pb-[300px] pt-10`}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 p-1 md:p-8">
                    <img
                        src={selectedImage}
                        alt="Playlist"
                        className="w-68 h-48 rounded-lg "
                    />
                    <div>
                        <p className="uppercase text-sm">TOP BÀI HÁT</p>
                        <h1 className="lg:text-5xl text-3xl font-bold">{selectedValue}</h1>
                        <p className="my-5 flex items-center text-sm">SoundWave · {listSongs.length} bài hát</p>
                        <div
                            className="flex items-center justify-center text-white lg:w-2/3 w-2/4 py-2 px-1 lg:px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer  lg:text-base text-sm"
                            onClick={() => {
                                handleFetchSongs("new");
                            }}
                        >
                            <Play size={18} className="mr-2" />
                            Phát Tất Cả
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-lg -mt-[265px] p-1 md:p-4 mx-1 md:mx-8">
                {/* Playlist Header */}
                {listSongs.length > 0 ? (
                    <ListSongs
                        songs={listSongs}
                    />
                ) : (
                    <p className='text-center text-gray-400 mt-10'>
                        Không có bài hát nào để hiển thị.
                    </p>
                )}
            </div>
        </>
    );

}

export default ListPlayLists;