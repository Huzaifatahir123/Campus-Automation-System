import React from "react";
import Image from "next/image";
import {Edit,Trash}  from "lucide-react"
type ListCardProps = {
  data: any[];
  role:string,
};

const statusStyles: Record<string, string> = {
  active: "bg-accent-100 text-accent-700",
  inactive: "bg-neutral-100 text-neutral-600",
  suspended: "bg-red-50 text-danger",
};

const ListCard = ({ data ,role}: ListCardProps) => {
  return (
    <div className="flex flex-col border border-neutral-200 rounded-2xl overflow-hidden bg-white">
      <div className="hidden md:grid grid-cols-[2fr_1.6fr_1fr_1fr_0.8fr_0.9fr_auto] gap-3 px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        <span>Student</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Reg No</span>
        <span>Address</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {data.map((student: any, i: number) => {
        const initials = `${student.first_name?.[0] ?? ""}${student.last_name?.[0] ?? ""}`.toUpperCase();
        const statusClass = statusStyles[student.status?.toLowerCase()] ?? "bg-neutral-100 text-neutral-600";

        return (
          <div
            key={student.registration_no}
            className={`grid grid-cols-2 md:grid-cols-[2fr_1.6fr_1fr_1fr_0.8fr_0.9fr_auto] gap-3 items-center px-4 py-2.5 text-sm ${
              i % 2 === 1 ? "bg-neutral-50/60" : "bg-white"
            } hover:bg-accent-50 transition-colors duration-150 border-b border-neutral-100 last:border-b-0`}
          >
            <div className="flex items-center gap-2.5 min-w-0 col-span-2 md:col-span-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-100 text-accent-700 font-semibold text-xs shrink-0">
                {initials || "?"}
              </div>
              <span className="font-medium text-neutral-800 truncate">
                {student.first_name} {student.last_name}
              </span>
            </div>

            <span className="text-neutral-600 truncate hidden md:block">{student.email || "—"}</span>
            <span className="text-neutral-600 hidden md:block">{student.phone || "—"}</span>
            <span className="text-neutral-500 hidden md:block">{student.registration_no}</span>
            <span className="text-neutral-500 hidden ml-2 md:block">{student.address || "—"}</span>

            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize w-fit ${statusClass}`}>
              {student.status || "unknown"}
            </span>

            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                aria-label="Edit student"
                className="flex items-center justify-center w-7 h-7 rounded-lg text-accent-700 bg-accent-50 hover:bg-accent-100 transition-colors"
              >
                <Edit className="cursor-pointer"/>
              </button>
              <button
                type="button"
                aria-label="Delete student"
                className="flex items-center justify-center w-7 h-7 rounded-lg text-danger bg-red-50 hover:bg-red-100 transition-colors"
              >
                <Trash  className="cursor-pointer"/>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListCard;