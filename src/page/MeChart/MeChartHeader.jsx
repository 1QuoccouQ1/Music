import React from "react";

function MeChartHeader() {
  return (
    <div className="flex items-center space-x-2 p-4">
      <h1 className="text-white text-3xl font-bold">
        <span className="text-pink-500">#zing</span>
        <span className="text-purple-500">chart</span>
      </h1>
      <button className="bg-purple-500 p-2 rounded-full">
        <i className="fas fa-play text-white"></i>
      </button>
    </div>
  );
}

export default MeChartHeader;
