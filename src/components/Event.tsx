import React from 'react'

const Event = () => {
  const events = [
    {
      id: 1,
      title: 'Event 1',
      date: new Date(2024, 5, 10),
      description: 'Description for Event 1',
    },
    {
      id: 2,
      title: 'Event 2',
      date: new Date(2024, 6, 10),
      description: 'Description for Event 1',
    },
    {
      id: 3,
      title: 'Event 3',
      date: new Date(2024, 7, 10),
      description: 'Description for Event 1',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-700">Events</h3>

      {events.map((ele) => (
        <div
          key={ele.id}
          className="flex flex-col gap-1 border-l-4 border-lama-sky bg-lama-sky/10 rounded-r-lg px-3 py-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-800">{ele.title}</span>
            <span className="text-xs text-gray-400">
              {ele.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
          <p className="text-xs text-gray-500">{ele.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Event