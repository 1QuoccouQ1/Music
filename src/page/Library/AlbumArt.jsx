import React from "react";

function AlbumArt({ imageUrl, title }) {
    return (
        <div className="flex flex-col pl-4 items-center">
            <img
                className="w-[284px] h-[278px] rounded-full"
                src={imageUrl}
                alt={title}
            />
            <p className="mt-2 text-white text-sm font-semibold">{title}</p>
        </div>
    );
}

export default AlbumArt;
