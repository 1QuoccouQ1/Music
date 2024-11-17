import React from 'react';
const LibraryPage = () => {


    return (
        <div className='bg-gray-900 min-h-screen p-8'>
            {/* Sections */}
            <div className='mb-8'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-semibold text-white'>
                        Nghe Gần Đây
                    </h3>
                    <button className='text-sm text-gray-400'>
                        Xem Tất Cả
                    </button>
                </div>
                <div className='flex space-x-4'>
                    <div className='w-[200px] h-[200px] flex items-center justify-center rounded-lg'>
                      <img src="https://i.pinimg.com/736x/d9/03/0a/d9030a5696d2507a1dfb38a686ac93c2.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
