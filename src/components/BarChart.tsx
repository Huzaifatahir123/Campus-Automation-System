"use client";
import { 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  Legend,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Male', count: 1120, fill: '#C3EBFA' }, 
  { name: 'Female', count: 850, fill: '#FAE27C' },  
];

const RadialCharts = () => {
  return (
    <div className='w-full h-80 bg-white rounded-2xl p-4 shadow-sm'>
  <h3 className='text-sm font-semibold text-gray-700 mb-2'>Strength</h3>

  <ResponsiveContainer width="100%" height="96%">
    <RadialBarChart
      cx="50%"
      cy="50%"
      innerRadius="40%"
      outerRadius="100%"
      barSize={32}
      data={data}
    >
      <RadialBar
        background
        dataKey="count" 
        cornerRadius={30}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </RadialBar>

      <Tooltip
        contentStyle={{
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          fontSize: "13px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      />

      <Legend
        iconType="circle"
        iconSize={8}
        layout="horizontal"
        verticalAlign="bottom"
        wrapperStyle={{ fontSize: "12px", color: "#6b7280", paddingTop: "8px" }}
      />
    </RadialBarChart>
  </ResponsiveContainer>
</div>
  );
};

export default RadialCharts;