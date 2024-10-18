import { Headphones ,UserRoundPlus,Play ,Check ,Heart,CirclePlus,Ellipsis } from 'lucide-react';
import { useState } from 'react';
function ProfileArtist() {
    const [isFlowwing, setIsFlowwing] = useState(false);

    const handleFlowwing = () => {
        setIsFlowwing(!isFlowwing);
    }

    return ( <>
    <div className='bg-medium w-full h-[2000px]'>
        <section className='w-full   pt-16  text-white px-5'>
            <div className="relative w-full h-[481px] z-10">
                <img src='../imgs/ab67618600001016bfff12c781d46c46b5268efb 1.png' className='rounded-t-xl h-full z-10'/>
                <div className="flex items-center justify-center absolute bottom-7 left-16 gap-8">
                    <img className='size-60 rounded-full border-1 border-black translate-y-1/4' src='../imgs/image (23).png' />
                    <div >
                        <p>Nghệ Sĩ Của Công Chúng</p>
                        <div className="flex items-center my-5">
                            <p className='text-7xl font-semibold '>Sơn Tùng MTP</p>
                            <img className='size-10 ml-5 ' src='../imgs/pepicons-pop_checkmark-filled.png'/>
                        </div>
                        <div className="flex items-center gap-7">
                            <p className='flex items-center  text-sm font-semibold gap-2'><Headphones  size={18}  className='text-red-600 '/> 1.584.659 người nghe hằng tháng</p>
                            <p className='flex  items-center  text-sm font-semibold gap-2 '><UserRoundPlus size={18}  className='text-red-600 '/> 5.940.438 người  theo dõi</p>
                        </div>
                        <div className='flex items-center gap-5 mt-5'>
                            <button className='flex items-center bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-2 box-border border-red-500 px-5 py-2 rounded-full font-semibold gap-1'>  <Play /> Phát tất cả</button>
                            {isFlowwing ? <button  onClick={handleFlowwing} className='flex items-center border-2 box-border border-red-500 px-4 py-2 rounded-full font-medium gap-1'>  <Check size={20} /> Đang theo dõi</button> : <button onClick={handleFlowwing} className='flex items-center border-2 box-border bg-gradient-to-r from-[#FF553E] to-[#FF0065] border-red-500 px-4 py-2 rounded-full font-medium gap-1'> Theo dõi</button> }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex py-4 w-full px-72 gap-10 rounded-b-xl drop-shadow-2xl  bg-slate-900'>
                <p className='font-medium hover:text-red-500 cursor-pointer text-sm duration-300 '>Nổi Bật</p>
                <p className='font-medium hover:text-red-500 cursor-pointer text-sm duration-300 '>Bài hát</p>
                <p className='font-medium hover:text-red-500 cursor-pointer text-sm duration-300 '>Single & EP</p>
                <p className='font-medium hover:text-red-500 cursor-pointer text-sm duration-300 '>Album</p>
            </div>
        </section>
        <section className='w-full text-white px-5 pt-10 flex '>
            <div className='flex w-2/3 flex-col gap-2' >
                <p className='text-right font-medium text-sm text-red-500 cursor-pointer mr-5'>Xem thêm</p>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Đừng Làm Trái Tim Anh Đau</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Chúng Ta Của Tương Lai</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Âm Thầm Bên Em</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Âm Thầm Bên Em</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
                <div className='flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300'>
                    <div className='flex items-center gap-3 w-1/3 justify-start'>
                          <Play size={18}  className='hidden  group-hover:block duration-300'/>
                        <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>01</p>
                        <img className='size-10 rounded-lg' src='../imgs/image (23).png'/>
                        <p className='w-full truncate '>Âm Thầm Bên Em</p>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                        <p>27.169.341</p>
                    </div>
                    <div className='flex items-center gap-5 duration-300 w-1/3 justify-end'>
                         <Heart size={16} className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'/>
                         <CirclePlus size={16} className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'/>
                        <p>04:05</p>
                         <Ellipsis size={16} className='opacity-0 group-hover:opacity-100 duration-300'/>
                    </div>
                </div>
               
            </div>  
            <div className='flex w-1/3 '>
                <div className='w-full h-full p-3 relative' >
                    <img className='rounded-xl w-full h-full' src='../imgs/ab67618600001016bfff12c781d46c46b5268efb 1.png' />
                    <p className='absolute bottom-5 left-5 text-sm w-80  '>Nguyễn Thanh Tùng, sinh năm 1994, được biết đến với nghệ danh Sơn Tùng M-TP, là một ca sĩ, nhạc sĩ, nhà sản xuất và diễn viên người Việt Nam. Anh không chỉ được biết đến là một trong những nghệ sĩ Việt Nam... <span className='font-semibold text-red-600  cursor-pointer'>Xem Thêm </span></p>
                </div>
            </div>
        </section>
    </div>
    </> );
}

export default ProfileArtist;