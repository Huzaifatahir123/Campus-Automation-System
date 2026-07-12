"use client"
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import Image from 'next/image'

const Performance = () => {
  const data = [
    { name: 'Passed', value: 92 },
    { name: 'Failed', value: 8 },
  ]

  const COLORS = ['#C3EBFA', '#FAE27C']

  return (
    <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 w-full h-90 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-slate-800">Semester Performance</h2>
        <Image src="/moreDark.png" width={16} height={16} alt="options" className="cursor-pointer" />
      </div>

      <div className="relative w-full h-[75%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="85%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-slate-800">{data[0].value}%</h1>
          <p className="text-xs text-slate-400">of 100</p>
        </div>
      </div>

      <h2 className="text-center text-sm text-slate-500 mt-1">
        1st Semester - 2nd Semester
      </h2>

  
    </div>
  )
}

export default Performance