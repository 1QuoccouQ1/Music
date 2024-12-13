import { X } from 'lucide-react';


function PlayListCreate() {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-20  flex items-center justify-center text-white bg-slate-800/40 ">
        <div className="w-[350px] h-[300px] rounded-md bg-medium z-20 relative">
          <X className='absolute top-5 right-5' />
          <h3>Tạo Playlist mới</h3>
        </div>
      </div>
    </>
  );
}

export default PlayListCreate;
