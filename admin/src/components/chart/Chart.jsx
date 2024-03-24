import React, { useRef, useEffect, useState } from 'react';
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title }) => {
  const chartRef = useRef(null);
  const [aspect, setAspect] = useState(() => {
    const storedAspect = localStorage.getItem('chartAspect');
    return storedAspect ? parseFloat(storedAspect) : 1;
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDataForLast6Days = async () => {
      try {
        const response = await fetch('/rental/count-rentals-last-6-days');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setChartData(Object.entries(data).map(([date, total]) => ({ name: date, Total: total })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForLast6Days();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const containerWidth = chartRef.current.clientWidth;
        const newAspect = containerWidth / 400;
        setAspect(newAspect);
        localStorage.setItem('chartAspect', newAspect.toString());
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="chart" ref={chartRef}>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
