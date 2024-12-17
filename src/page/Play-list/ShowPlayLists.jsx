import { Link } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { useState, useEffect } from "react";
function ShowPlayLists() {
  const [listAlbum, setListAlbum] = useState([]);
  const [loading, setLoading] = useState(true); // Theo dõi trạng thái loading

  const fetchAlbum = async () => {
    try {
      const response = await fetch(API_URL + `/playlist-public`);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  return (
    <>
      <section className="bg-medium w-full h-auto pb-32 pt-8 md:pt-16  text-white px-1 md:px-10 ">
        <h1 className="md:text-3xl text-2xl font-medium mb-10">PLayLists</h1>
        <div className="flex  w-full flex-wrap">
          {listAlbum ? (
            listAlbum.map((album) => (
              <Link
                to={`/Playlists/${album.id}/public`}
                key={album.id}
                className="pr-3 pb-3 group xl:w-1/6 lg:w-1/4 md:w-1/3 w-1/2 px-2"
              >
                <img
                  src={album.background}
                  className="w-full rounded-xl flex items-center justify-center bg-cover bg-center brightness-100 transition-all duration-300 group-hover:brightness-125"
                />
                <p className="text-center mt-2 truncate w-full">
                  {album.playlist_name}
                </p>
              </Link>
            ))
          ) : (
            <div className="w-1/6 px-2 mb-10  cursor-pointer">
              Không có Play List nào
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ShowPlayLists;
