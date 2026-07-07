import React from 'react'

const Announcement = () => {
  const annouments = [
    {
      id: 1,
      title: 'Announcement 1',
      date: new Date(2024, 5, 10),
      description: 'Description for Event 1',
    },
    {
      id: 2,
      title: 'Announcement 2',
      date: new Date(2024, 6, 10),
      description: 'Description for Event 1',
    },
    {
      id: 3,
      title: 'Annoucement 3',
      date: new Date(2024, 7, 10),
      description: 'Description for Event 1',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">Announcements</h3>
        <span className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200">
          View All
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {annouments.map((ele) => (
          <div
            key={ele.id}
            className="bg-lama-yellow-light rounded-lg p-3 flex flex-col gap-1 hover:bg-lama-yellow/40 transition-colors duration-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">{ele.title}</span>
              <span className="text-xs text-gray-400 bg-white/70 px-2 py-0.5 rounded-full">
                {ele.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
            <p className="text-xs text-gray-500">{ele.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement