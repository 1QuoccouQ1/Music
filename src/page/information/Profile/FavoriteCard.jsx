import React from 'react';

const FavoriteCard = ({ type, icon }) => {
  return (
    <div className="flex justify-between items-center bg-pink-100 rounded-lg p-6 w-full">
      <div className="text-pink-500 text-3xl">
        {icon === 'heart' ? '❤️' : '➕'}
      </div>
      <div className="text-xl font-semibold text-pink-500">{type}</div>
    </div>
  );
};

export default FavoriteCard;
