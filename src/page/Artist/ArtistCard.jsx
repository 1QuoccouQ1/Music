
    import React from "react";




    function ArtistCard({ artist }) {
        return (
            <div className="flex flex-col items-center">
                <img
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                    src={artist.imageUrl}
                    alt={artist.name}
                />
                <h3 className="mt-2 text-white text-sm md:text-md font-semibold">{artist.name}</h3>
                <p className="text-gray-400 text-sm">{artist.profession}</p>
            </div>
        );
    }
    export default ArtistCard;
    