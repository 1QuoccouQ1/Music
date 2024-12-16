import React from 'react';
import { Play, Heart, CirclePlus, Ellipsis } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../../ContextAPI/UserContext';
import { toast } from "react-toastify";
import { API_URL } from '../../../services/apiService';
import { useOutletContext } from 'react-router-dom';
import ProfileArtistSong from "../../BXH/ProfileArtistSong";

const LibraryPage = () => {
    const songs = JSON.parse(localStorage.getItem("songHistory"));
    const user = JSON.parse(localStorage.getItem("user"));
    const {  handleListSongs } = useContext(UserContext);
    const { settext } = useOutletContext();

    useEffect(() => {
        if (user.id) {
            settext(`${songs ? songs.length : 0} Bài hát vừa nghe`)
        }
    }, [songs]);  

    
    return (
        <>
            <div className="flex items-center text-white justify-end text-sm py-1 px-1 md:px-3 rounded-lg cursor-pointer duration-300">
                <button className='text-white group py-2 px-7 rounded-md w-[160px] bg-gradient-to-r from-[#FF0065] to-[#FF553E] lg:opacity-80 cursor-pointer hover:opacity-100 flex'
                    onClick={() => handleListSongs("history")}
                >
                    <Play size={18} className="duration-300 md:hidden group-hover:inline  mr-2" />
                    Nghe tất cả</button>
            </div>
            <div className="flex items-center text-white justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300">
                <div className="flex items-center gap-3 w-1/3 justify-start"  >
                    <p className="text-xs w-[18px] h-[18px] duration-300">
                        #
                    </p>
                    <p className="w-full truncate " >Tên bài hát</p>
                </div>
                <div className="w-1/3 hidden lg:flex items-center justify-center">
                    <p>Lượt nghe</p>
                </div>
                <div className="flex items-center gap-5 duration-300 w-1/3 justify-end">
                    Hành động
                </div>
            </div>

            {songs ? (
                <ProfileArtistSong
                artistSong={songs}
                user_id={1}
                length = {'20'}
                />
                
            ) : (
                <p className="text-xs text-white duration-300">Không có bài hát nào</p>
            )}


        </>
    );
};

export default LibraryPage;
