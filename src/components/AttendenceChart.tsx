"use client"
import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
    

    const data = [
        {
          name: '   Mon ', present: 4000, absent: 1000, amt: 2400,
        },
        {   name: '   Tue ', present: 3000, absent: 2000, amt: 2210,
        },
        {
          name: '   Wed ', present: 2000, absent: 800, amt: 2290,
        },
        {   name: '   Thu ', present: 2780, absent: 3908, amt: 2000,
        },
        {   name: '   Fri ', present: 1890, absent: 4800, amt: 2181,}
    ]



const AttendenceChart = () => {
  return (
    <div className='w-full h-full bg-white rounded-2xl p-4 shadow-sm'>
        <BarChart
      style={{ width: '100%', maxWidth: '700px', outline:'none', height: '96%',aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="present" fill="#cfceff" activeBar={{ fill: 'green', stroke: 'white' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="absent" fill="#c3ebfa" activeBar={{ fill: 'red', stroke: 'white' }} radius={[10, 10, 0, 0]} />
      
    </BarChart>
    </div>
  )
}

export default AttendenceChart