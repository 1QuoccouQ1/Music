import { Heart, Play, Ellipsis } from "lucide-react";
import ProfileArtistSong from "../BXH/ProfileArtistSong";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { UserContext } from "../../ContextAPI/UserContext";
import { toast } from "react-toastify";

function SongDetail() {
  const { handleAddSong } = useContext(UserContext);
  const [listSong, setListSong] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState(null);
  const [SongFavourite, setIsSongFavourite] = useState([]);
  const handleSongFavourite = (song_id, check) => {
    if (!user) {
      // Kiểm tra đã đăng nhập chưa
      toast.error(
        "Bạn chưa đăng nhập, vui lòng đăng nhập để thêm vào yêu thích."
      );
    } else {
      // Gửi request API khi người dùng nhấn "Theo giỏi"
      fetch(API_URL + "/bai-hat-yeu-thich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          liked: !check,
          song_id: song_id,
          user_id: user.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Xử lý dữ liệu trả về từ API (nếu cần)
          // console.log('Đã đánh dấu yêu thích:', data.message);
          if (check) {
            setIsSongFavourite((set) => {
              return set.filter((id) => id !== song_id);
            });
          } else {
            setIsSongFavourite((set) => {
              return [...set, song_id];
            });
          }
          toast.success(data.message);
        })
        .catch((error) => {
          console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }
  };

  useEffect(() => {
    const fetchListRamdom = async () => {
      try {
        const response = await fetch(API_URL + `/rand-10`);
        const data = await response.json();
        setListSong(data); // Cập nhật state `artist`
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setLoading(false); // Đặt loading = false
      }
    };

    const fetchArtistsong = async () => {
      try {
        const response = await fetch(API_URL + `/bai-hat/${id}`);
        const data = await response.json();

        if (response.status == false) {
          console.error("Error fetching artist data:", data.message);
        } else {
          setSong(data); // Cập nhật state `artist`
        }
      } catch (error) {
        console.error("Error fetching artist data:", error.message);
      }
    };
    const FavouriteSong = async () => {
      try {
        const response = await fetch(
          API_URL + `/${user.id}/bai-hat-yeu-thich`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await response.json();
        // console.log(response);
        if (response.status === 200) {
          const songId = data.map((song) => song.id);
          setIsSongFavourite(songId);
        } else {
          console.log("Lỗi khi lấy danh sách bài hát yêu thích");
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      FavouriteSong();
    }

    fetchArtistsong();
    fetchListRamdom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-medium w-full h-auto  pt-16  text-white px-10 ">
        <div className="lg:flex items-start w-full">
          <div className="flex flex-col lg:w-1/3 items-center justify-center ">
            {song && (
              <>
                <img
                  src={song.song_image}
                  alt={song.song_name}
                  className="lg:w-3/4 sm:w-1/2 w-full h-auto rounded-lg"
                />
                <h1 className="text-3xl font-bold mt-6 text-center">
                  {song.song_name}
                </h1>
                <p className="text-xl mt-2">{song.singer_name}</p>
                <div className="flex items-center justify-center space-x-4">
                  <p className="text-sm mt-2 text-slate-400">
                    {song.country_name}
                  </p>
                  <p className="text-sm mt-2 text-slate-400">
                    {song.category_name}
                  </p>
                </div>
                <p className="text-sm mt-2 text-slate-400">
                  {song.listen_count} lượt nghe  -  {song.like_count} lượt thích
                </p>
                <div
                  className="flex items-center mt-4 py-2 px-6 bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full cursor-pointer hover:opacity-85 duration-300"
                  onClick={() => handleAddSong("song", song.id)}
                >
                  <Play />
                  <p className="ml-2">Phát Bài Hát</p>
                </div>
                <div className="flex items-center justify-center my-6 space-x-4">
                  {SongFavourite.includes(song.id) ? (
                    <div className="p-2 bg-slate-800 rounded-full cursor-pointer">
                      <Heart
                        size={18}
                        fill="white"
                        onClick={() => handleSongFavourite(song.id, true)}
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-slate-800 rounded-full cursor-pointer">
                      <Heart
                        size={18}
                        onClick={() => handleSongFavourite(song.id, false)}
                      />
                    </div>
                  )}

                  <div className="p-2 bg-slate-800 rounded-full cursor-pointer">
                    <Ellipsis size={18} />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="lg:w-2/3 flex items-start">
            <div className="flex w-full  flex-col gap-2 ">
              <div className="flex items-center justify-between">
                <p className="text-left font-medium text-sm  cursor-pointer mr-5">
                  Đề xuất cho bạn
                </p>
                {/* <p className="text-right font-medium text-sm text-red-500 cursor-pointer mr-5">
                  Xem thêm
                </p> */}
              </div>

              {listSong && listSong.length > 0 ? (
                <ProfileArtistSong
                  artistSong={listSong}
                  user_id={user ? user.id : null}
                  length={"10"}
                />
              ) : (
                <div className="flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300">
                  Không có bài hát nào.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SongDetail;
