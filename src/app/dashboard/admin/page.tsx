import UserCard from "@/components/UserCard";
import React from "react";
import BarCharts from "@/components/BarChart";
import AttendenceChart from "@/components/AttendenceChart";
import ExpsenseChart from "@/components/ExpenseChart";
import Cal from "@/components/Calendar";
import Event from "@/components/Event";
import Announcement from "@/components/Announcement";
const page = () => {
  return (
    <div className=" px-4 lg:px-8 md:flex gap-2 max-sm:flex-col max-sm:gap-5 max-sm:justify-center max-sm:items-center   py-10 w-full h-full  ">
      <div className="w-full flex-col flex gap-5   lg:w-2/3">
        <div className="flex gap-4 w-full items-start content-start  flex-wrap ">
          <UserCard type="teachers" />
          <UserCard type="students" />
          <UserCard type="parents" />
          <UserCard type="staff" />
        </div>

        <div className="w-full gap-4  flex max-lg:flex-col max-lg:justify-center max-lg:items-center ">
          <div className="w-full h-96 lg:w-[33%] bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Students</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-lama-sky" />
                  <span className="text-xs text-gray-500">Male : 1120</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-lama-yellow" />
                  <span className="text-xs text-gray-500">Female : 850</span>
                </div>
              </div>
            </div>

            <BarCharts />
          </div>

          <div className="w-full h-100   lg:w-[66%] ">
            <AttendenceChart />
          </div>
        </div>
        <div className="w-full h-96 ">
          <ExpsenseChart />
        </div>
      </div>

      <div className="w-full flex-col mt-3 flex gap-2 lg:w-1/3 ">
        <Cal />
        <Event />
        <Announcement />
      </div>
    </div>
  );
};

export default page;
