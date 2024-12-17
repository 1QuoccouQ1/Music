import React, { useEffect, useState } from 'react';
import ReactStars from "react-stars";
import { API_URL } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

function Comment({ id, setIsTotal, setAverageRating }) {
    const [rating, setRating] = useState(0); // Số sao được chọn
    const [comment, setComment] = useState(""); // Nội dung bình luận
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const fecthReviews = async (id) => {
        try {
            const response = await fetch(`${API_URL}/binh-luan/${id}`);
            const data = await response.json();
            if (!response.ok) {
                setReviews([]);
                setIsTotal(0);
                setAverageRating(0);
            } else {

                setReviews(data);
                const total = data.length;
                setIsTotal(total);
                setAverageRating(data.reduce((sum, review) => sum + review.rating, 0) / total);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fecthReviews(id);

    }, [location]);


    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Bạn cần đăng nhập để đánh giá!");
            return;
        }
        if (rating === 0) {
            toast.error("Vui lòng nhập đủ số sao và nội dung đánh giá!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/binh-luan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({
                    song_id: id,
                    user_id: user.id,
                    comment: comment,
                    rating: rating,
                }),
            });
            const data = await response.json(); // Lấy dữ liệu trả về từ server
            if (!response.ok) {
                toast.error(data.message);
            } else {
                // Thêm vào danh sách đánh giá
                setReviews((prevReviews) => [
                    {
                        id: data.id, // ID từ server
                        name: user.name,
                        comment: comment,
                        rating: rating,
                        rating_date: new Date(),
                    },
                    ...prevReviews,
                ]);

                toast.success("Đánh giá thành công!");
                setComment("");
                setRating(0); // Reset rating và comment sau khi submit
            }
        } catch (e) {
            toast.error("Đã có lỗi xảy ra!");
        }

    };

    function formatDateToVietnamese(dateInput) {
        // Chuyển dateInput thành đối tượng Date (nếu chưa phải)
        const date = new Date(dateInput);

        // Lấy các thành phần của ngày giờ
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        // Kết hợp thành chuỗi định dạng dd/mm/yyyy hh:mm:ss
        return `${hours}:${minutes}  ${day}-${month}-${year} `;
    }

    return (
        <>
            <div className='md:flex gap-4 mt-10 xl:mx-0 mx-4'>
                {/* Form đánh giá */}
                <form
                    onSubmit={handleSubmit}
                    className='w-full lg:w-1/2 '
                >
                    <h2 className='text-xl'>Đánh giá bài hát</h2>
                    <ReactStars
                        count={5}
                        size={17}
                        value={rating}
                        onChange={handleRatingChange}
                        activeColor="#ffd700"
                        half={false}
                        className='mb-2'
                    />
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Viết bình luận..."
                        rows="4"
                        className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500'
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full md:w-[150px] p-3 bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-500 text-white block mt-2 py-3 rounded-lg font-semibold text-center"
                    >Gửi đánh giá</button>
                </form>
                {/* Danh sách đánh giá */}
                <div className='w-full lg:w-1/2'>
                    <h2 className='p-2 text-xl'>Danh sách đánh giá</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500 my-2'
                            >
                                <div className='flex justify-between items-center'>
                                    <div className="">
                                        <ReactStars
                                            count={5}
                                            size={15}
                                            value={review.rating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='text-sm mt-2 text-slate-400'>{formatDateToVietnamese(review.rating_date)}</p>
                                    </div>
                                    <div className='flex items-center flex-col '>
                                        <img src="/Music Brand and App Logo 1@2x.png" alt="avata"
                                            className='w-[40px] h-[40px] p-2 rounded-full border' />
                                        <p className='mt-1'>{review.name}</p>
                                    </div>
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có đánh giá nào.</p>
                    )}
                </div>
            </div>
        </>
    );

}

export default Comment;