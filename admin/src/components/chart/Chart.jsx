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

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = ({ title }) => {
  const chartRef = useRef(null);
  const [aspect, setAspect] = useState(() => {
    const storedAspect = localStorage.getItem('chartAspect');
    return storedAspect ? parseFloat(storedAspect) : 1;
  });

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
        <AreaChart data={data}>
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
