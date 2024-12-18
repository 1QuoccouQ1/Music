import { Heart } from "lucide-react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
function Albums() {
  const [listAlbum, setListAlbum] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [albumFavorite, setAlbumFavorite] = useState([]);
  const [loading, setLoading] = useState(true); // Theo dõi trạng thái loading

  const fetchAlbum = async () => {
    try {
      const response = await fetch(API_URL + `/album`);
      const data = await response.json();

      if (response.status == false) {
        console.error("Error fetching artist data:", data.message);
      } else {
        setListAlbum(data); // Cập nhật state `artist`
      }
    } catch (error) {
      console.error("Error fetching artist data:", error.message);
    } finally {
      setLoading(false); // Đặt loading = false
    }
  };
  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbumFAvorite = async (user_id) => {
    try {
      const response = await fetch(API_URL + `/${user_id}/album-yeu-thich`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();

      if (response.status == false) {
        console.error("Error fetching artist data:", data.message);
      } else {
        const ids = data.map((album) => album.id);
        setAlbumFavorite(ids); // Cập nhật state `artist`
      }
    } catch (error) {
      console.error("Error fetching artist data:", error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchAlbumFAvorite(user.id);
    }
  }, [user?.id]);

  const handleAlbumFavourite = (albumId, like) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm yêu thích");
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
  };
  // Hàm chuyển đổi datetime thành năm
  const extractYearFromDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi
    if (isNaN(date.getTime())) return "Invalid date"; // Kiểm tra nếu ngày không hợp lệ
    return date.getFullYear(); // Lấy năm
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    ); // Hiển thị loading khi chưa có dữ liệu
  }
  return (
    <>
      <section className="bg-medium w-full h-auto pb-32 pt-8 md:pt-16  text-white px-1 md:px-10 ">
        <h1 className="md:text-3xl text-2xl font-medium mb-10">Albums</h1>
        <div className="flex  w-full flex-wrap">
          {listAlbum ? (
            listAlbum.map((album, index) => (
              <div
                key={index + 1}
                className="xl:w-1/6 lg:w-1/4 md:w-1/3 w-1/2 px-2 mb-10 group relative overflow-hidden cursor-pointer"
              >
                <img
                  src={album.image}
                  className=" rounded mb-2 w-full"
                  onClick={() => navigate(`/AlbumDetail/${album.id}`)}
                />
                <div className="absolute cursor-pointer top-2 z-10 left-4 bg-white text-red-500 p-2 rounded-full shadow-lg transform lg:scale-0 group-hover:scale-100 transition duration-300 ease-in-out">
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
                <div className="flex justify-between">
                  <div className="w-full">
                    <p
                      className="text-lg font-bold w-10/12 group-hover:underline line-clamp-2"
                      onClick={() => navigate(`/AlbumDetail/${album.id}`)}
                    >
                      {album.album_name}
                    </p>
                    <p className="text-sm text-slate-700 hover:underline">
                      {album.singer_name}
                    </p>
                    <p className="text-xs text-slate-700">
                      {extractYearFromDate(album.creation_date)}
                    </p>
                  </div>
                  <img
                    className="size-4"
                    src="../imgs/Img - Explicit → SVG.png"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-1/6 px-2 mb-10  cursor-pointer">
              Không có Album nào
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Albums;
