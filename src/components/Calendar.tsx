"use client"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Cal() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Calendar</h3>

      <Calendar onChange={onChange} value={value} />
      
    </div>
  );
}
export default Cal;