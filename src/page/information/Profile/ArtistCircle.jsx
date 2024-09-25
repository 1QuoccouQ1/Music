import React from 'react';

const ArtistCircle = ({ name }) => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 rounded-full bg-gray-700"></div>
      <p className="text-white mt-2">{name}</p>
    </div>
  );
};

export default ArtistCircle;
