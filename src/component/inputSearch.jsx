// components/InputSearch.js
import  { useState } from 'react';

function InputSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch({ query });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center bg-[#172533] py-2 px-3 h-[40px] w-[500px]  rounded-3xl">
      
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border-none mx-2 w-[300px] bg-transparent focus:outline-none text-white text-sm placeholder-gray-600"
        placeholder="Tìm kiếm....."
      />
      <div
        className="absolute right-5 rounded-xl p-[7px] text-white cursor-pointer  duration-300"
        onClick={handleSearch}
      >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        fill='currentColor'
        className="search-icon ml-2"
        viewBox="0 0 24 24"
        width="17"
        height="17"
      >
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
      </svg>
      </div>
    </div>
  );
}

export default InputSearch;
