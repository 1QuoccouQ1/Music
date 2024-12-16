import { Headphones, UserRoundPlus, Play, Check, Heart, CirclePlus, Ellipsis, UserRound, X, Filter } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Facebook, Instagram, Twitter, Music } from "lucide-react"
import { Link, useParams } from 'react-router-dom';
import { API_URL, getArtist } from '../../services/apiService';
import { toast } from 'react-toastify';
import ProfileArtistSong from './ProfileArtistSong';
import { UserContext } from '../../ContextAPI/UserContext';
import { useNavigate } from "react-router-dom";


function ProfileArtist() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isSelect, setIsSelect] = useState("1");
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [artists, setArtists] = useState([]);
    const [artistFavorite, setartistFavorite] = useState([]);
    const [artistSong, setArtistSong] = useState([]);
    const [loading, setLoading] = useState(true); // Theo dõi trạng thái loading
    const { handleFetchSongs } = useContext(UserContext);
    const [albumSinger, setAlbumSinger] = useState([]);
    const navigate = useNavigate();
    const [albumFavorite, setAlbumFavorite] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user_id.id);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
        const fetchArtistData = async () => {
            try {
                const response = await fetch(API_URL + `/ca-si/${id}`);
                const data = await response.json();
                setArtist(data); // Cập nhật state `artist`
            } catch (error) {
                console.error('Error fetching artist data:', error);
            } finally {
                setLoading(false); // Đặt loading = false
            }
        };

        const fetchArtistsong = async () => {
            try {
                const response = await fetch(API_URL + `/ca-si/${id}/bai-hat`);
                const data = await response.json();

                if (response.status == false) {
                    console.error('Error fetching artist data:', data.message);

                } else {
                    setArtistSong(data); // Cập nhật state `artist`
                }
            } catch (error) {
                console.error('Error fetching artist data:', error.message);
            } finally {
                setLoading(false); // Đặt loading = false
            }
        };
        const fetchArtistAlbum = async () => {
            try {
                const response = await fetch(API_URL + `/album/${id}/ca-si`);
                const data = await response.json();

                if (response.status == false) {
                    console.error('Error fetching artist data:', data.message);

                } else {
                    setAlbumSinger(data); // Cập nhật state `artist`
                }
            } catch (error) {
                console.error('Error fetching artist data:', error.message);
            } finally {
                setLoading(false); // Đặt loading = false
            }
        };


        const folow = async () => {
            try {

                const response = await fetch(API_URL + `/check-ca-si-yeu-thich/${user.id}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    // console.log(data);
                    data[0] === true ? setIsFollowing(true) : setIsFollowing(false);

                }
            } catch (err) {
                console.log(err.message); // Cập nhật state lỗi
            } finally {
                setLoading(false); // Tắt loading
            }
        }
        if (user) {
            folow();
        }
        fetchArtistsong();
        fetchArtistData();
        fetchArtistAlbum()

    }, [id]);

    // theo thích ca sĩ
    const handleFollowing = () => {
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
                    liked: !isFollowing,
                    singer_id: id,
                    user_id: user.id
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Xử lý dữ liệu trả về từ API (nếu cần)
                    // console.log('Đã đánh dấu yêu thích:', data.message);
                    setIsFollowing(!isFollowing);
                    toast.success(data.message);
                })
                .catch(error => {
                    // console.error('Lỗi khi gửi yêu cầu:', error);
                    toast.success('Lỗi khi gửi yêu cầu:', error);
                });

        }
    }
    // lấy danh sách ca sĩ
    useEffect(() => {
        getArtist()
            .then((data) => {
                setArtists(data);
            })
            .catch((error) => {
                console.error('Error fetching artist data:', error);
            });
    }, []);
    // lấy ca sĩ yêu thích theo user
    useEffect(() => {
        const FavouriteSinger = async () => {
            try {
                const response = await fetch(API_URL + `/${user.id}/ca-si-yeu-thich`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const data = await response.json();
                // console.log(response);
                if (response.status === 200) {
                    const singerId = data.data.map(singer => singer.id);
                    // console.log(data);
                    setartistFavorite(singerId);
                } else {
                    console.log('Lỗi khi lấy danh sách ca sĩ yêu thích');
                }

            } catch (err) {
                console.log(err);

            }
        };
        if (user) {
            FavouriteSinger();
        }
    }, []);
    // thêm ca sĩ yêu thích ở dưới danh sách
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
                        setartistFavorite((set) => {
                            return set.filter((id) => id !== singer_id);
                        })
                    } else {
                        setartistFavorite((set) => {
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

    const handleModal = () => {
        setIsModal(!isModal);
    }

    const handleSelect = (option) => {
        setIsSelect(option);
    };
    useEffect(() => {
        if (isModal) {
            // Khi Modal mở, chặn cuộn trang
            document.body.style.overflow = 'hidden';
        } else {
            // Khi Modal đóng, khôi phục lại khả năng cuộn trang
            document.body.style.overflow = 'auto';
        }
        return () => {
            // Dọn dẹp khi component unmount hoặc khi modal đóng
            document.body.style.overflow = 'auto';
        };
    }, [isModal]);

    const fetchAlbumFAvorite = async (user_id) => {
        try {
            const response = await fetch(API_URL + `/${user_id}/album-yeu-thich`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();

            if (response.status == false) {
                console.error('Error fetching artist data:', data.message);

            } else {
                const ids = data.map((album) => album.id)
                setAlbumFavorite(ids); // Cập nhật state `artist`
            }
        } catch (error) {
            console.error('Error fetching artist data:', error.message);
        } finally {
            setLoading(false); // Đặt loading = false
        }
    }
    if (user) {
        useEffect(() => {
            fetchAlbumFAvorite(user.id);
        }, [user.id]);
    }
    const handleAlbumFavourite = (albumId, like) => {
        if (!user) {
            toast.error('Vui lòng đăng nhập để thêm yêu thích');
            return false;
        }
        // Gửi request API khi người dùng nhấn "Theo giỏi"
        fetch(API_URL + "/album-yeu-thich", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                liked: !like,
                album_id: albumId,
                user_id: user.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý dữ liệu trả về từ API (nếu cần)
                // console.log('Đã đánh dấu yêu thích:', data.message);
                if (like) {
                    setAlbumFavorite((set) => {
                        return set.filter((id) => id !== albumId);
                    });
                } else {
                    setAlbumFavorite((set) => {
                        return [...set, albumId];
                    });
                }
                toast.success(data.message);
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }

    const limitCharacters = (str, charCount) => {
        if (str.length > charCount) {
            return str.slice(0, charCount) + '...'; // Cắt chuỗi và thêm dấu "..."
        }
        return str; // Nếu chuỗi ít hơn hoặc bằng số ký tự giới hạn, trả lại nguyên chuỗi
    };

    // Hàm chuyển đổi datetime thành năm
    const extractYearFromDate = (dateString) => {
        if (!dateString) return 'Invalid date';
        const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi
        if (isNaN(date.getTime())) return 'Invalid date'; // Kiểm tra nếu ngày không hợp lệ
        return date.getFullYear(); // Lấy năm
    };
    // Ngăn render cho đến khi `artist` có dữ liệu
    if (!artist) {
        return (<div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>); // Hiển thị loading khi chưa có dữ liệu
    }
    // console.log(albumFavorite);

    return (<>
        <div className='bg-medium w-full h-auto pb-40'>
            <section className='w-full pt-7 text-white px-1 lg:px-5'>
                <div className="relative w-full lg:h-[600px] md:h-[330px] h-[500px] z-10">
                    <img src={artist.singer_background} className='rounded-t-xl  xl:h-full w-full' />
                    <div className="flex flex-wrap items-center md:mt-0 justify-center absolute bottom-0 lg:bottom-7 px-3 xl:left-16 gap-8">
                        <img className='lg:size-60 size-48 rounded-full border-8 border-[#0B1928] lg:translate-y-1/4' src={artist.singer_image} />
                        <div className=''>
                            <p>Nghệ Sĩ Của Công Chúng</p>
                            <div className="flex items-center my-5">
                                <p className='text-3xl lg:text-7xl font-semibold '> {artist.singer_name}</p>
                                <img className='size-10 ml-5 ' src='../imgs/pepicons-pop_checkmark-filled.png' />
                            </div>
                            <div className="flex items-center gap-7">
                                <p className='flex items-center  text-sm font-semibold gap-2'><Headphones size={18} className='text-red-600 ' /> 1.584.659 người nghe hằng tháng</p>
                                <p className='flex  items-center  text-sm font-semibold gap-2 '><UserRoundPlus size={18} className='text-red-600 ' /> 5.940.438 người  theo dõi</p>
                            </div>
                            <div className='flex items-center justify-between md:justify-start  gap-5 mt-5'>
                                <button className='flex items-center bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-2 box-border border-red-500 px-5 py-2 rounded-full font-semibold gap-1' onClick={() => handleFetchSongs("casi", artist.id)}>  <Play /> Phát tất cả</button>

                                {isFollowing ?
                                    <button onClick={handleFollowing} className='flex items-center border-2 box-border border-red-500 px-4 py-2 rounded-full font-medium gap-1'>  <Check size={20} /> Đang theo dõi</button>
                                    :
                                    <button onClick={handleFollowing} className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-4 py-2 rounded-full font-medium gap-1'> Theo dõi</button>
                                }


                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex py-4 w-full justify-center gap-10 rounded-b-xl shadow-medium-xl  bg-slate-900'>
                    <p onClick={() => handleSelect("1")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "1" ? "text-red-500" : " text-white"} `}>Nổi Bật</p>
                    <p onClick={() => handleSelect("2")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "2" ? "text-red-500" : " text-white"} `}>Bài hát</p>
                    <p onClick={() => handleSelect("3")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "3" ? "text-red-500" : " text-white"} `}>Single & EP</p>
                    {/* <p onClick={() => handleSelect("4")} className={`font-medium hover:text-red-500 cursor-pointer text-sm duration-300  ${isSelect === "4" ? "text-red-500" : " text-white"} `}>Album</p> */}
                </div>
            </section>
            {isSelect === "1" && <><section className='w-full text-white px-1 lg:px-5 pt-10 flex flex-wrap'>
                <div className='flex w-full lg:w-2/3 flex-col gap-2' >
                    <div className='flex items-center justify-between border-b border-slate-500 pb-2'>
                        <h3 className='text-base font-medium'>Tất Cả Bài Hát</h3>
                        <p className='flex items-center font-medium text-sm pl-32 cursor-pointer'>Lượt nghe</p>
                        <p className='flex items-center font-medium text-sm  cursor-pointer mr-5'> <Filter size={15} className='mr-2' /> Tùy chọn</p>
                    </div>
                    {artistSong && artistSong.length > 0 ? (
                        <ProfileArtistSong artistSong={artistSong} user_id={user ? user.id : null} length={'5'} />
                    ) : (
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                            Không có bài hát nào.
                        </div>
                    )}
                </div>
                <div className='flex w-full lg:w-1/3 '>
                    <div className='w-full h-full p-3 relative ' >
                        <img className='rounded-xl w-full h-full shadow-2xl' src={artist.singer_background} />
                        <p className='absolute bottom-4 left-7 text-sm w-5/6'>{limitCharacters(artist.singer_biography, 120)}<span onClick={handleModal} className='font-semibold text-red-600  cursor-pointer'>Xem Thêm </span></p>
                    </div>
                </div>
            </section>
                <section className="bg-medium pt-10 text-white  px-1 lg:px-5 h-auto tracking-wide">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium mb-16">Single & EP</h1>
                        <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                            <p className="text-sm text-red-600 ">Xem Thêm </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto" // Số item hiện trong 1 lần
                        className="mySwiper "

                    >
                        {artistSong && artistSong.length > 0 ? (
                            artistSong.map((song, index) => (

                                <SwiperSlide key={(song.id)} style={{ width: '200px' }} >

                                    <div className="text-center flex flex-col w-full items-start ">
                                        <img src={song.song_image} className=" mb-3 " style={{
                                            width: '160px',
                                            height: '160px',
                                            borderRadius: '15px',

                                        }} />
                                        <p className='flex '>{song.song_name}</p>
                                        <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất.</p>
                                        <p className='flex text-sm text-slate-600 mt-1'>Đĩa đơn </p>
                                    </div>
                                </SwiperSlide>
                            ))) : (
                            <SwiperSlide style={{ width: 'auto' }} >
                                <div className="text-center flex flex-col  items-start ">
                                    Không có bài hát nào.
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </section>
                <section className="bg-medium pt-10 text-white px-1 lg:px-5 h-auto tracking-wide">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium mb-16">Album Hot</h1>
                        <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                            <p className="text-sm text-red-600 ">Xem Thêm </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        </div>

                    </div>

                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto" // Số item hiện trong 1 lần
                        className="mySwiper "

                    >
                        {albumSinger && albumSinger.length > 0 ? (
                            albumSinger.map((album, index) => (
                                <SwiperSlide key={(index)} style={{ width: 'auto' }} >
                                    <div className="w-full flex flex-col w-full" key={index} >
                                        <div className="w-full relative group flex w-full">
                                            <img src={album.image} className="cursor-pointer  z-10" style={{
                                                width: '190px',
                                                height: '190px',
                                                borderRadius: '15px',
                                            }}
                                                onClick={() => navigate(`/AlbumDetail/${album.id}`)}
                                            />
                                            <img
                                                src="../imgs/Red And Black Modern Live Music Podcast Instagram Post (2) 3.png"
                                                className="absolute translate-x-1/5 w-full h-full"
                                            />
                                            <div
                                                className="absolute cursor-pointer top-2 z-20 right-2 bg-white text-red-500 p-2 rounded-full shadow-lg transform lg:scale-0 group-hover:scale-100 transition duration-300 ease-in-out"
                                            >

                                                {albumFavorite != [] ? (
                                                    albumFavorite.includes(album.id) ? (
                                                        <Heart
                                                            size={22}
                                                            fill="red"
                                                            onClick={() => handleAlbumFavourite(album.id, true)}
                                                            className="text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300"
                                                        />
                                                    ) : (
                                                        <Heart
                                                            size={22}
                                                            onClick={() => handleAlbumFavourite(album.id, false)}
                                                            className="text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300"
                                                        />
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-base font-medium ml-2 mt-1 mt-3 w-56 truncate">{album.album_name}</p>
                                        <p className="text-sm font-medium ml-2 text-slate-500">{extractYearFromDate(album.creation_date)}</p>
                                    </div>
                                </SwiperSlide>
                            ))) : (
                            <SwiperSlide style={{ width: 'auto' }} >
                                <div className="w-1/6 flex flex-col w-full">
                                    Không có Album nào.
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </section>
                <section className="bg-medium pt-10 text-white px-1 lg:px-5 h-auto tracking-wide">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium mb-16">{artist.singer_name} trong loạt hit nổi bật</h1>
                        <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                            <p className="text-sm text-red-600 ">Xem Thêm </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto" // Số item hiện trong 1 lần
                        className="mySwiper "

                    >
                        {artistSong && artistSong.length > 0 ? (
                            artistSong.map((song, index) => (
                                <SwiperSlide key={(song.id)} style={{ width: 'auto' }} >
                                    <div className="text-center flex flex-col  items-start ">
                                        <img src={song.song_image} className=" mb-3 rounded-xl w-44 h-44" />
                                        <p className='text-sm ml-2'>{song.song_name}</p>
                                        <p className=' text-sm text-slate-600 mt-1 truncate w-52'>{song.description}.... </p>
                                    </div>
                                </SwiperSlide>
                            ))) : (
                            <SwiperSlide style={{ width: 'auto' }} >
                                <div className="text-center flex flex-col  items-start ">
                                    Không có bài hát nào.
                                </div>
                            </SwiperSlide>
                        )}

                    </Swiper>

                </section>
                <section className="bg-medium pt-10 text-white px-1 lg:px-5 h-auto tracking-wide w-full max-w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium mb-16">Fan có thể thích</h1>
                        <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                            <Link to={`/Artist`} className="text-sm text-red-600 ">Xem Thêm </Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto" // Số item hiện trong 1 lần
                        className="mySwiper "
                    >
                        {artists && artists.length > 0 ? (
                            artists.map((artist, index) => (
                                <SwiperSlide key={index} style={{ width: 'auto' }} >
                                    <div className="text-center">
                                        <Link to={`/ProfileArtist/${artist.id}`}>
                                            <img src={artist.singer_image} className="rounded-full mb-3 w-32 h-32 md:w-52 md:h-52" />
                                            <p className="font-medium mb-2 text-base">{artist.singer_name}</p>
                                        </Link>
                                        <p className="text-sm text-slate-700">Nghệ Sĩ</p>
                                        {artistFavorite.includes(artist.id) ?
                                            <button onClick={() => handleFollowinglistsinger(artist.id, true)} className='flex items-center border-2 box-border border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm'>  <Check size={20} /> Đang theo dõi</button>
                                            :
                                            <button onClick={() => handleFollowinglistsinger(artist.id, false)} className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-3 mt-3 mx-auto py-1 rounded-full font-medium gap-1 text-sm '> <UserRoundPlus size={15} className='text-white ' /> Theo dõi</button>
                                        }
                                    </div>
                                </SwiperSlide>
                            ))) : (
                            <SwiperSlide style={{ width: 'auto' }} >
                                <div className="text-center">
                                    <p>Không có ca sĩ nào</p>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>

                </section> </>}
            {isSelect === "2" && <> <section className='w-full text-white px-1 lg:px-5 pt-5 flex '>
                <div className='flex w-full flex-col gap-2' >
                    <div className='flex items-center justify-between border-b border-slate-500 pb-2'>
                        <h3 className='text-base font-medium'>Tất Cả Bài Hát</h3>
                        <p className='flex items-center font-medium text-sm ml-44 cursor-pointer'>Lượt nghe</p>
                        <p className='flex items-center font-medium text-sm  cursor-pointer mr-5'> <Filter size={15} className='mr-2' /> Tùy chọn</p>
                    </div>
                    {artistSong && artistSong.length > 0 ? (
                        <ProfileArtistSong
                            artistSong={artistSong}
                            user_id={user ? user.id : null}
                            length={'20'} />) : (
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                            <p>Không có bài hát</p>
                        </div>
                    )}

                </div>
            </section>
                <section className="bg-medium pt-10 text-white px-1 lg:px-10 h-auto tracking-wide">
                    <div className="flex items-center justify-between">

                        <h1 className="text-xl font-medium mb-16">{artist.singer_name} trong loạt hit nổi bật</h1>
                        <div className="flex items-center text-red-600 hover:text-red-600  cursor-pointer duration-300">
                            <p className="text-sm text-red-600 ">Xem Thêm </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto" // Số item hiện trong 1 lần
                        className="mySwiper "

                    >


                        {artistSong && artistSong.length > 0 ? (
                            artistSong.map((song, index) => (
                                <SwiperSlide key={(song.id)} style={{ width: 'auto' }} >
                                    <div className="text-center flex flex-col  items-start ">
                                        <img src={song.song_image} className=" mb-3 rounded-xl w-44 h-44" />
                                        <p className='text-sm ml-2'>{song.song_name}</p>
                                        <p className=' text-sm text-slate-600 mt-1 truncate w-52'>{song.description}.... </p>
                                    </div>
                                </SwiperSlide>
                            ))) : (
                            <SwiperSlide style={{ width: 'auto' }} >
                                <div className="text-center flex flex-col  items-start ">
                                    Không có bài hát nào.
                                    {/* <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 " />
                                    <p className=''>Đừng Làm Trái Tim Anh đau</p>
                                    <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot />  Đĩa đơn </p> */}
                                </div>
                            </SwiperSlide>
                        )}

                    </Swiper>

                </section></>}
            {isSelect === "3" && <> <section className="bg-medium text-white w-full h-auto pb-32 pt-5 px-1 lg:px-5 ">
                <div className="">
                    <div className='flex items-center justify-between border-b border-slate-500 pb-2'>
                        <h3 className='text-base font-medium'>Tất Cả Bài Hát</h3>
                        <p className='flex items-center font-medium text-sm ml-44 cursor-pointer'>Lượt nghe</p>
                        <p className='flex items-center font-medium text-sm  cursor-pointer mr-5'> <Filter size={15} className='mr-2' /> Tùy chọn</p>
                    </div>
                    {artistSong && artistSong.length > 0 ? (
                        <ProfileArtistSong
                            artistSong={artistSong}
                            user_id={user ? user.id : null}
                            length={'20'} />) : (
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                            <p>Không có bài hát</p>
                        </div>
                    )}
                    {/* <div className="w-1/6 px-2 mb-7  cursor-pointer">
                        <div className="text-center flex flex-col  items-start ">
                            <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 " />
                            <p className=''>Đừng Làm Trái Tim Anh đau</p>
                            <p className='flex text-sm text-slate-600 mt-1'>Bản Phát hành Mới nhất <Dot />  Đĩa đơn </p>
                        </div>
                    </div>
                   */}
                </div>
            </section></>}
            {/* {isSelect === "4" && <>
                <section className='w-full flex gap-10 items-center text-white px-7 pt-10 '>
                    <div className='size-60 rounded-lg'>
                        <img className='rounded-lg w-full h-full ' src='../imgs/412544823_377358094767954_6428436036322132060_n 2.png' />
                    </div>
                    <div className='flex flex-col gap-14 '>
                        <div className='flex flex-col gap-2 '>
                            <p className='text-xl font-semibold '>Sky Tour (Original Motion Picture Soundtrack)</p>
                            <p className='text-red-600 font-semibold '>Sơn Tùng M-TP</p>
                            <p className='text-sm text-slate-500'>POP · 2020</p>
                        </div>
                        <div className='flex text-sm cursor-pointer hover:opacity-90 items-center gap-2 font-medium py-1 px-3 rounded-lg bg-gradient-to-r from-[#FF553E] to-[#FF0065] w-max'> <Play size={15} /> Phát Nhạc</div>
                    </div>
                </section>
                <section className='w-full text-white px-5 pt-10 flex '>
                    <div className='flex w-full flex-col gap-2' >
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                            <div className='flex items-center gap-3 w-1/2 justify-start'>
                                <Play size={18} className='hidden  group-hover:block duration-300' />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                                <p className='w-full truncate '>Sky Tour (Intro)</p>
                            </div>

                            <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                                <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <p>04:05</p>
                                <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                            <div className='flex items-center gap-3 w-1/2 justify-start'>
                                <Play size={18} className='hidden  group-hover:block duration-300' />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                                <p className='w-full truncate '>Sky Tour (Intro)</p>
                            </div>

                            <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                                <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <p>04:05</p>
                                <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                            <div className='flex items-center gap-3 w-1/2 justify-start'>
                                <Play size={18} className='hidden  group-hover:block duration-300' />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                                <p className='w-full truncate '>Sky Tour (Intro)</p>
                            </div>

                            <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                                <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <p>04:05</p>
                                <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                            <div className='flex items-center gap-3 w-1/2 justify-start'>
                                <Play size={18} className='hidden  group-hover:block duration-300' />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                                <p className='w-full truncate '>Sky Tour (Intro)</p>
                            </div>

                            <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                                <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <p>04:05</p>
                                <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                            <div className='flex items-center gap-3 w-1/2 justify-start'>
                                <Play size={18} className='hidden  group-hover:block duration-300' />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                                <p className='w-full truncate '>Sky Tour (Intro)</p>
                            </div>

                            <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                                <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <p>04:05</p>
                                <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-2 px-3 rounded-lg cursor-pointer group duration-300'>
                            <div className='flex items-center gap-3 w-1/2 justify-start'>
                                <Play size={18} className='hidden  group-hover:block duration-300' />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                                <p className='w-full truncate '>Sky Tour (Intro)</p>
                            </div>

                            <div className='flex items-center gap-5 duration-300 w-1/2 justify-end'>
                                <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300' />
                                <p>04:05</p>
                                <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300' />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-medium pt-10 text-white px-5 h-auto tracking-wide">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium mb-7">Sơn Tùng M-TP Trong Loạt Hit Nổi Bật</h1>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto" // Số item hiện trong 1 lần
                        className="mySwiper "

                    >
                        <SwiperSlide style={{ width: 'auto' }} >
                            <div className="text-center flex flex-col  items-start ">
                                <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 " />
                                <p className='text-sm ml-2'>Nhạc gen Z</p>
                                <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: 'auto' }} >
                            <div className="text-center flex flex-col  items-start ">
                                <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 " />
                                <p className='text-sm ml-2'>Nhạc gen Z</p>
                                <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: 'auto' }} >
                            <div className="text-center flex flex-col  items-start ">
                                <img src="../imgs/412544823_377358094767954_6428436036322132060_n 2.png" className=" mb-3 " />
                                <p className='text-sm ml-2'>Nhạc gen Z</p>
                                <p className=' text-sm ml-2 text-slate-600 mt-1 truncate w-52'>Hoàng Thùy Linh, Sơn tùng mTP, mono.... </p>
                            </div>
                        </SwiperSlide>

                    </Swiper>

                </section>
            </>} */}
        </div>
        {isModal && (<div className=" fixed top-0 bottom-0 right-0 left-0 z-20">
            <div className="bg-black h-[608px] bg-opacity-50 text-white  rounded-xl max-w-4xl w-full flex absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                <div className="w-1/3 pr-4  p-6 relative flex flex-col  " style={{
                    backgroundImage: `url(${artist.singer_image}`, // Đặt đường dẫn tới ảnh nền
                    backgroundSize: 'cover',  // Để ảnh phủ kín
                    backgroundPosition: 'center',  // Ảnh được căn giữa
                }}>
                    <div className='bg-black w-full h-full absolute opacity-20 top-0 left-0 z-10 rounded-xl '></div>
                    <div className="flex flex-col gap-4 items-start mt-auto ">
                        <Facebook size={16} className="w-6 h-6" />
                        <Instagram size={16} className="w-6 h-6" />
                        <Twitter size={16} className="w-6 h-6" />
                        <Music size={16} className="w-6 h-6" />
                    </div>
                </div>
                <div className="w-2/3 px-4 pt-6 bg-white text-black rounded-r-xl">
                    <p className="mb-4 font-bold">{artist.singer_biography}</p>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='border border-pink-600 p-2 rounded-full '>
                                <UserRound size={20} className='text-pink-600' />
                            </div>
                            <button className="text-pink-600  px-4 py-2 rounded-s-full font-semibold">
                                {artist.singer_name}
                            </button>
                        </div>
                        <X onClick={handleModal} className='mr-4 hover:text-red-600 cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>)}

    </>);
}

export default ProfileArtist;

