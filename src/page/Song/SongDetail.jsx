import { Heart, Play, Ellipsis } from "lucide-react";
import ProfileArtistSong from "../BXH/ProfileArtistSong";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { UserContext } from "../../ContextAPI/UserContext";
import { toast } from "react-toastify";

function SongDetail() {
  const { handleAddSong } = useContext(UserContext);
  const [listSong, setListSong] = useState([
    {
      id: 40,
      song_name: "Bạn Đời",
      singer_name: "Karik",
      singer_id: 25,
      country_name: "Việt Nam",
      country_id: 1,
      category_name: "Rap",
      category_id: 12,
      provider: "KARIK",
      composer: "KARIK -FT. GDUCKY",
      download_count: 0,
      copyright_type: null,
      publisher_name: null,
      description: "KARIK - BẠN ĐỜI (FT. GDUCKY)",
      lyrics:
        "<p>Kiếp trước có lẽ 2 ta yêu nhau mà chẳng thể thành vợ chồng<br>Nghĩ thoáng nên mai ra sao tụi mình cũng đều hài lòng<br>Có thể hôm nay thương, có thể tương lai buông&nbsp;<br>Có thể ta không giàu, miễn ở bên nhau vui không buồn&nbsp;<br>Chớp mắt 20-30 chiều nao rồi tụi mình cũng về già<br>Ai rồi sẽ phải trước sau theo 1 người cùng về nhà<br>Bước tiếp hay quên đi, nghĩ lắm chi thêm suy &nbsp;<br>Ta cứ như bây giờ lo âu xa xôi để làm gì</p><p>Ta yêu là yêu vậy thôi…không có khái niệm đúng và sai<br>Mấy đứa hay nói lời khó nghe…bên nhau ta bỏ ngoài tai<br>We rolling overnight…không ai phải nghi ngờ ai<br>Không quan tâm bao nhiêu lần sai, chỉ cần em còn thương là anh vẫn ở lại.<br>Đừng nói đến những thứ vốn quá lớn lao<br>Đâu ai chắc ngày mai 2 ta sẽ chẳng thể bỏ nhau&nbsp;<br>Giữ tim không hoài nghi bình yên trong ta sẽ đủ lâu<br>Cứ vô tư biết đâu ngày sau lại vui như tình đầu</p><p>Gặp gỡ trong tâm thế người dưng, chọn ở bên nhau vì bình yên<br>Quá khứ, hiện tại là tình nguyện…tiếc là trên đời không gì là vĩnh viễn&nbsp;<br>Vì lời hứa không thắng nổi thời gian, trừ sự cố gắng cả 2 thì có thể<br>Nhưng nếu phải đặt 2 từ “trách nhiệm” xuống, liệu lòng chung thuỷ có bị làm khó dễ?<br>Bởi chúng ta cũng chỉ là người thường, may mắn gặp và trở thành người thương<br>Nên anh chẳng mong gì xa xôi ngoài sự tử tế nếu lỡ 1 người buông<br>Dù ở lại hay là lỡ thương ai, đừng dành nửa kia lòng thương hại<br>Cả khi điều vẫn nghĩ là “suốt đời” hồi đáp lại rằng không có tương lai<br>Khi 1 mai tụi mình nhạt nhoà, ngọt ngào theo sau chẳng được như bấy lâu<br>Khó đến mấy cứ nói 1 lời thật lòng rồi buông dù chỉ là mấy câu&nbsp;<br>Đừng lo cho anh sẽ thấy đau<br>Cười nên dù không thể lấy nhau<br>Cả 2 có rơi xuống đáy sâu, tương lai chẳng thấy đâu<br>Vẫn vui như ngày đầu<br>Hãy thắp sáng hết những ngày còn lại<br>Nếu như thời gian bên nhau không còn dài<br>Nếu đến ngày phải buông tay, chỉ xin đừng quên hôm nay<br>Đã từng biết nhau trên cõi đời này…</p><p>Kiếp trước có lẽ 2 ta yêu nhau mà chẳng thể thành vợ chồng<br>Nghĩ thoáng nên mai ra sao tụi mình cũng đều hài lòng<br>Có thể hôm nay thương, có thể tương lai buông&nbsp;<br>Có thể ta không giàu, miễn ở bên nhau vui không buồn&nbsp;<br>Chớp mắt 20-30 chiều nao rồi tụi mình cũng về già<br>Ai rồi sẽ phải trước sau theo 1 người cùng về nhà<br>Bước tiếp hay quên đi, nghĩ lắm chi thêm suy &nbsp;<br>Ta cứ như bây giờ lo âu xa xôi để làm gì</p><p>Mỗi lần anh nghĩ về 2 từ bạn đời lại nở 1 nụ cười bất giác<br>Bởi vì anh thấy 2 từ này khó hiểu hơn cả mấy chuyện đất cát<br>Anh đã từng muốn được là rapper và trở thành 1 người rất khác<br>Nhưng anh chưa từng nghĩ là một ngày anh sẽ sợ phải mất em nhiều hơn mất rap<br>Bởi vì mẹ nói…yêu có thể dễ, nhưng mà đâu dễ để con kiếm được bạn đời<br>Chung sống bên nhau, sinh con, đẻ cái, trăm năm thì đâu có thể là chuyện tạm thời<br>Anh bắt đầu lo, khi em bước tới và làm anh muốn rước về làm dâu cả đời<br>Nhưng mà anh đúng hay anh sai trong chuyện đó thì chị “Tiên” bảo là thời gian mới biết câu trả lời<br>Nên em ơi em…em luôn rất yên bình, thật là xinh và thích thêu thùa<br>Không như tôi…luôn thô ráp bên ngoài và gặp ai cũng muốn trêu đùa<br>Vậy là sao! 1 người gầy và 1 người cao…<br>1 người quen buông lời cay đắng lại va vào ngay 1 người ngọt ngào<br>Thế giới có thể đánh giá 2 đứa rất khác nhau, nhưng như vậy không đúng<br>Bởi vì tôi chỉ muốn thấy em, sau khi gặp công chúng<br>Có những lúc tôi như muốn phát điên, em không hề than phiền<br>Nắm lấy cánh tay tôi đang run lên và trao tôi nụ cười ngoan hiền…<br>That’s why I love this girl…can you see?&nbsp;<br>That’s why I love this girl…can you see?<br>Baby you love your man…I can see!<br>That we are meant to be…meant to be</p><p>Chớp mắt 20-30 chiều nao rồi tụi mình cũng về già<br>Ai rồi sẽ phải trước sau theo 1 người cùng về nhà&nbsp;</p>",
      song_image:
        "https://soundwave2.s3.amazonaws.com/song_image/1733517567_ban_doi.jpg",
      release_day: null,
      listen_count: 6,
      like_count: 0,
      time: 318.048,
      file_paths: {
        basic:
          "https://soundwave2.s3.amazonaws.com/music/ban_doi/1733517569_ban_doi_128kbps.mp3",
        plus: "https://soundwave2.s3.amazonaws.com/music/ban_doi/1733517573_ban_doi_320kbps.mp3",
        premium: null,
      },
    },
    {
      id: 36,
      song_name: "See You Again",
      singer_name: "Charlie Puth",
      singer_id: 47,
      country_name: "Âu Mỹ",
      country_id: 4,
      category_name: "Hip-hop",
      category_id: 8,
      provider: "Wiz Khalifa",
      composer: "Charlie Puth, Wiz Khalifa, DJ Frank E và Andrew Cedar.",
      download_count: 0,
      copyright_type: null,
      publisher_name: null,
      description: "Wiz Khalifa - See You Again ft. Charlie Puth",
      lyrics:
        "<p>It's been a long day without you my friend<br>And I'll tell you all about it when I see you again<br>We've come a long way from where we began<br>Oh I'll tell you all about it when I see you again<br>When I see you again<br><br>Damn who knew all the planes we flew<br>Good things we've been through<br>That I'll be standing right here<br>Talking to you about another path I<br>Know we loved to hit the road and laugh<br>But something told me that it wouldn't last<br>Had to switch up look at things different see the bigger picture<br>Those were the days hard work forever pays now I see you in a better place<br><br>How could we not talk about family when family's all that we got?<br>Everything I went through you were standing there by my side<br>And now you gonna be with me for the last ride<br><br>It's been a long day without you my friend<br>And I'll tell you all about it when I see you again<br>We've come a long way from where we began<br>Oh I'll tell you all about it when I see you again<br>when I see you again<br><br>First you both go out your way<br>And the vibe is feeling strong and what's<br>Small turn to a friendship a friendship<br>Turn into a bond and that bond will never<br>Be broke and the love will never get lost<br>And when brotherhood come first then the line<br>Will never be crossed established it on our own<br>When that line had to be drawn and that line is what<br>We reach so remember me when I'm gone<br><br>How could we not talk about family when family's all that we got?<br>Everything I went through you were standing there by my side<br>And now you gonna be with me for the last ride<br><br>So let the light guide your way hold every memory<br>As you go and every road you take will always lead you home<br><br>It's been a long day without you my friend<br>And I'll tell you all about it when I see you again<br>We've come a long way from where we began<br>Oh I'll tell you all about it when I see you again<br>When I see you again</p>",
      song_image:
        "https://soundwave2.s3.amazonaws.com/song_image/1733513114_see_you_again.jpg",
      release_day: null,
      listen_count: 6,
      like_count: 0,
      time: 237.453,
      file_paths: {
        basic:
          "https://soundwave2.s3.amazonaws.com/music/see_you_again/1733513121_see_you_again_128kbps.mp3",
        plus: "https://soundwave2.s3.amazonaws.com/music/see_you_again/1733513128_see_you_again_320kbps.mp3",
        premium: null,
      },
    },
  ]);
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
                  {song.listen_count} người nghe
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
                <p className="text-right font-medium text-sm text-red-500 cursor-pointer mr-5">
                  Xem thêm
                </p>
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
