import React from 'react';
import { Link } from 'react-router-dom';

function ArtistCard({ artist }) {
    return (
        <Link to={`/ProfileArtist/${artist.name}`} className='flex flex-col items-center transition-transform delay-50 duration-100 transform hover:scale-110 cursor-pointer'>
            <img
                className='w-40 h-40 md:w-40 md:h-40 rounded-full ease-in duration-500 '
                src={artist.imageUrl}
                alt={artist.name}
            />
            <h3 className='mt-2 text-white text-sm md:text-md font-semibold'>
                {artist.name}
            </h3>
            <p className='text-gray-400 text-sm'>{artist.profession}</p>
        </Link>
    );
}

export default ArtistCard;
