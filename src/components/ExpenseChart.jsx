"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react'
const data = [
  {
    name: 'Jan',
    Expense: 4000,
    Revenue: 2400,
    amt: 2     
  },
  {
    name: 'Feb',
    Expense: 4200,
    Revenue: 5500,
    amt: 2     
  },
  {
    name: 'Mar',
    Expense: 1200,
    Revenue: 3500,
    amt: 2     
  },
  {
    name: 'Apr',
    Expense: 4050,
    Revenue: 5000,
    amt: 2     
  },
  {
    name: 'May',
    Expense: 400,
    Revenue: 2000,
    amt: 2     
  },
]
  const LAMA_SKY = "#C3EBFA";
const LAMA_YELLOW = "#FAE27C";
const ExpenseChart = () => {
  return (
 

<div className="w-full h-96 bg-white rounded-2xl p-4 shadow-sm">
  <h3 className="text-sm font-semibold text-gray-700 mb-2">Finance</h3>

  <LineChart
    style={{ width: '100%', maxWidth: '900px', height: '96%', maxHeight: '70vh', aspectRatio: 1.618 }}
    responsive
    data={data}
    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
    <XAxis dataKey="name" stroke="#9ca3af" />
    <YAxis width="auto" stroke="#9ca3af" />
    <Tooltip
      cursor={{ stroke: "#d1d5db" }}
      contentStyle={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        borderRadius: '10px',
        fontSize: '13px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    />
    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
    <Line
      type="monotone"
      dataKey="Expense"
      stroke={LAMA_SKY}
      strokeWidth={2}
      dot={{ fill: "#ffffff" }}
      activeDot={{ r: 8, stroke: "#ffffff" }}
    />
    <Line
      type="monotone"
      dataKey="Revenue"
      stroke={LAMA_YELLOW}
      strokeWidth={2}
      dot={{ fill: "#ffffff" }}
      activeDot={{ stroke: "#ffffff" }}
    />
  </LineChart>
</div>
  )
}

export default ExpenseChart