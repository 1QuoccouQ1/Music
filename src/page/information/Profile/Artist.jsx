import { useState, useEffect, useContext } from "react";
import { API_URL } from '../../../services/apiService';
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import { Check } from "lucide-react";
import { toast } from "react-toastify";
function Artist() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { settext } = useOutletContext();
    const navigate = useNavigate();
    const [artists, setArtist] = useState([]);

    const getArtist = () => {
        fetch(API_URL + `/${user.id}/ca-si-yeu-thich`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Chuyển đổi phản hồi thành JSON
            })
            .then(data => {
                console.log(data.data); // Xử lý dữ liệu trả về
                setArtist(data.data)
            })
            .catch(error => {
                console.error("Error fetching artist:", error); // Xử lý lỗi
            });
        ;
    };

    useEffect(() => {
        getArtist();
        
    }, []);

    settext(artists.length + ' Ca sĩ yêu thích');
    
    const handleFollowinglistsinger = (singer_id, check) => {
        if (!user) {
            toast.error('Vui lòng đăng nhập để theo dõi ca sĩ.');
            return;
        } else {
            // Gửi request API khi người dùng nhấn "Theo giỏi"
            fetch(API_URL + '/ca-si/add-to-favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    liked: !check,
                    singer_id: singer_id,
                    user_id: user.id
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Xử lý dữ liệu trả về từ API (nếu cần)
                    // console.log('Đã đánh dấu yêu thích:', data.message);
                    if (check) {
                        getArtist((set) => {
                            return set.filter((id) => id.id !== singer_id);
                        })
                    } else {
                        getArtist((set) => {
                            return [...set, singer_id];
                        })
                    }
                    toast.success(data.message);

                })
                .catch(error => {
                    // console.error('Lỗi khi gửi yêu cầu:', error);
                    toast.success('Lỗi khi gửi yêu cầu:', error);
                });

        }
    }

    return (
        <section className='bg-medium w-full h-auto pb-16 pt-10 text-white px-6'>
            <div className='flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start'>
                {artists.map((artist, index) => (
                    <div className="text-center mt-6">
                        <Link to={`/ProfileArtist/${artist.id}`} className="">
                            <img src={artist.singer_image} className="rounded-full mb-3 w-28 h-28 md:w-44 md:h-44 mx-auto" />
                            <p className="font-medium mb-2 text-base">{artist.singer_name}</p>
                        </Link>
                        <p className="text-sm text-slate-700">Nghệ Sĩ</p>

                        <button onClick={() => handleFollowinglistsinger(artist.id, true)} className='flex items-center border-2 box-border border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm'>  <Check size={20} /> Đang theo dõi</button>

                    </div>

                ))}
            </div>
        </section>
    );
}

export default Artist;