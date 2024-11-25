function ListenedMusic() {
    return (
        <>
        <section className='bg-medium w-full h-auto pb-16 pt-10 text-white px-6'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                    {[...Array(12)].map((_, index) => (
                        <div key={index} className='cursor-pointer'>
                            <img
                                src='../imgs/image (19).png'
                                className='rounded mb-2 w-full object-cover'
                                alt='Album cover'
                            />
                            <div className='flex items-start justify-between'>
                                <div className='w-full'>
                                    <p className='text-lg font-bold truncate'>
                                        1
                                    </p>
                                    <p className='text-sm truncate'>
                                        Short n' Sweet
                                    </p>
                                    <p className='text-xs text-slate-500 truncate'>
                                        Sabrina Carpenter
                                    </p>
                                </div>
                                <img
                                    className='w-5 h-5 ml-2'
                                    src='../imgs/Img - Explicit → SVG.png'
                                    alt='Explicit'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
     );
}

export default ListenedMusic;