import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function MeChartGraph() {
  const chartRef = useRef(null);

  const data = {
    labels: ["13:00", "15:00", "17:00", "19:00", "21:00", "23:00", "01:00", "03:00", "05:00", "07:00", "09:00", "11:00"],
    datasets: [
      {
        label: "Vừa Hận Vừa Yêu",
        data: [40, 35, 30, 28, 35, 42, 50, 48, 46, 43, 40, 39],
        borderColor: "#4a90e2",
        pointBackgroundColor: "#4a90e2", // Chấm tròn có cùng màu với đường kẻ
        pointHoverRadius: 8, // Tăng kích thước chấm khi hover
        pointRadius: 6, // Kích thước chấm mặc định
        pointHoverBackgroundColor: "#fff", // Màu nền khi hover
        borderWidth: 2, // Độ dày mặc định của đường kẻ
        hoverBorderWidth: 4, // Độ dày khi hover
        fill: false,
        tension: 0.1,
      },
      {
        label: "Là Tại Anh Sai",
        data: [30, 25, 24, 26, 32, 34, 40, 36, 33, 31, 30, 29],
        borderColor: "#32c8a3",
        pointBackgroundColor: "#32c8a3",
        pointHoverRadius: 8,
        pointRadius: 6,
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        hoverBorderWidth: 4,
        fill: false,
        tension: 0.1,
      },
      {
        label: "Hứa Đợi Nhưng Chẳng Tới",
        data: [20, 18, 15, 17, 22, 28, 35, 34, 32, 30, 29, 28],
        borderColor: "#ff4a4a",
        pointBackgroundColor: "#ff4a4a",
        pointHoverRadius: 8,
        pointRadius: 6,
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        hoverBorderWidth: 4,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white", // Màu văn bản của legend
        },
      },
      tooltip: {
        enabled: true, // Hiện tooltip khi hover
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Màu chữ của các nhãn trên trục x
        },
      },
      y: {
        ticks: {
          color: "white", // Màu chữ của các nhãn trên trục y
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    elements: {
      point: {
        radius: 0, // Không hiển thị chấm mặc định
        hoverRadius: 8, // Chỉ hiển thị chấm khi hover
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="p-6 w-[1668px] h-[300px]">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default MeChartGraph;
