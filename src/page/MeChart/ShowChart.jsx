import React from "react";
import MeChartHeader from "./MeChartHeader";
import MeChartGraph from "./MeChartGraph";
import SongList from "./SongList";


function ShowChart() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
        <MeChartHeader/>
        <MeChartGraph/>
        <SongList/>
    </div>
  );
}

export default ShowChart;
