"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Edit,
  Mail,
  MapPin,
  Phone,
  UserRound,
  UsersRound,
  GraduationCap,
  Hash,
  UserPlus,
} from "lucide-react";

import StudentSchdule from "@/components/StudentSchdule";
import Announcement from "@/components/Announcement";
import Performance from "@/components/Performance";
import { getStudentById } from "@/services/student/studentFetch";

type Parent = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  occupation: string;
  relationship: string;
};

type Student = {
  student_id: number;
  registration_no: number;
  blood_group: string | null;
  address: string;
  status: "Active" | "Graduated" | "Suspended" | "Transferred";

  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  is_active: boolean;

  parent: Parent | null;

  section: {
    id: number;
    section_name: string;
    class: {
      id: number;
      grade: string | number;
    };
  };

  student_created_at: string;
  student_updated_at: string;
};

const formatDate = (date: string) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatShortDate = (date: string) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number | null | undefined;
}) => {
  return (
    <div className="flex gap-3 flex-1 min-w-[200px]">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
        <Icon size={15} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-neutral-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );
};

const SectionCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-4">
        <Icon size={17} className="text-accent-500" />
        <h2 className="text-sm font-semibold text-neutral-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const studentID = String(id);

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");
        const res: any = await getStudentById(studentID);
        setStudent(res.data.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load student details.");
      } finally {
        setLoading(false);
      }
    };

    if (studentID) fetchStudent();
  }, [studentID]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-accent-500" />
          Loading student...
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-danger">{error || "Student not found."}</p>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-accent-500 hover:text-accent-700"
        >
          Go back
        </button>
      </div>
    );
  }

  const fullName = `${student.first_name} ${student.last_name}`;

  return (
    <div className="w-full flex flex-col gap-4 pb-8">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-neutral-800"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        Back to students
      </button>

      {/* Student Header */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="h-1 bg-accent-500" />

        <div className="flex flex-col gap-6 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/profile.png"
                width={80}
                height={80}
                alt="Student profile"
                className="h-20 w-20 rounded-xl object-cover ring-1 ring-neutral-200"
              />
              <span
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                  student.is_active ? "bg-success" : "bg-neutral-400"
                }`}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
                  {fullName}
                </h1>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    student.status === "Active"
                      ? "bg-green-50 text-success"
                      : student.status === "Suspended"
                      ? "bg-red-50 text-danger"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Hash size={13} />
                  {student.registration_no}
                </span>
                <span className="text-neutral-300">•</span>
                <span>Grade {student.section.class.grade}</span>
                <span className="text-neutral-300">•</span>
                <span>Section {student.section.section_name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push(`/students/${student.student_id}/edit`)}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-accent-700"
          >
            <Edit size={14} />
            Edit Student
          </button>
        </div>

        <div className="flex flex-col border-t border-neutral-100 divide-y divide-neutral-100 md:flex-row md:divide-y-0 md:divide-x">
          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <Mail size={16} className="text-neutral-400" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-neutral-400">Email</p>
              <p className="truncate text-xs font-medium text-neutral-700">{student.email}</p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <Phone size={16} className="text-neutral-400" />
            <div>
              <p className="text-[10px] uppercase tracking-wide text-neutral-400">Phone</p>
              <p className="text-xs font-medium text-neutral-700">{student.phone}</p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <CalendarDays size={16} className="text-neutral-400" />
            <div>
              <p className="text-[10px] uppercase tracking-wide text-neutral-400">Date of Birth</p>
              <p className="text-xs font-medium text-neutral-700">{formatDate(student.date_of_birth)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* Personal */}
        <div className="xl:flex-1">
          <SectionCard title="Personal Information" icon={UserRound}>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              <InfoItem icon={UserRound} label="First Name" value={student.first_name} />
              <InfoItem icon={UserRound} label="Last Name" value={student.last_name} />
              <InfoItem icon={Mail} label="Email" value={student.email} />
              <InfoItem icon={Phone} label="Phone" value={student.phone} />
              <InfoItem icon={CalendarDays} label="Date of Birth" value={formatDate(student.date_of_birth)} />
              <InfoItem icon={Hash} label="Blood Group" value={student.blood_group} />
              <div className="w-full">
                <InfoItem icon={MapPin} label="Address" value={student.address} />
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Academic */}
        <div className="xl:flex-1">
          <SectionCard title="Academic Information" icon={GraduationCap}>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              <InfoItem icon={Hash} label="Registration Number" value={student.registration_no} />
              <InfoItem icon={GraduationCap} label="Grade" value={student.section.class.grade} />
              <InfoItem icon={UsersRound} label="Section" value={student.section.section_name} />
              <InfoItem icon={CalendarDays} label="Enrolled" value={formatShortDate(student.student_created_at)} />
              <InfoItem icon={UserRound} label="Account Status" value={student.is_active ? "Active" : "Inactive"} />
              <InfoItem icon={Hash} label="Student ID" value={student.student_id} />
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Parent */}
      {student.parent ? (
        <SectionCard title="Parent / Guardian" icon={UsersRound}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-500">
                <UserRound size={21} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  {student.parent.first_name} {student.parent.last_name}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500 capitalize">
                  {student.parent.relationship}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap gap-4 lg:ml-8">
              <InfoItem icon={Phone} label="Phone" value={student.parent.phone} />
              <InfoItem icon={Mail} label="Email" value={student.parent.email} />
              <InfoItem icon={UserRound} label="Occupation" value={student.parent.occupation} />
            </div>
          </div>
        </SectionCard>
      ) : (
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-500">
              <UsersRound size={19} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-800">No parent assigned</h3>
              <p className="mt-1 text-xs text-neutral-500">
                This student does not have a parent or guardian linked yet.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-accent-700 active:scale-[0.98]"
          >
            <UserPlus size={15} strokeWidth={2} />
            Assign Parent
          </button>
        </div>
      )}

      {/* Schedule + Performance */}
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm xl:flex-[2]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-neutral-800">Student Schedule</h2>
              <p className="mt-0.5 text-xs text-neutral-400">Current academic schedule</p>
            </div>
          </div>
          <StudentSchdule />
        </div>

        <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm xl:flex-1">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-neutral-800">Performance</h2>
            <p className="mt-0.5 text-xs text-neutral-400">Academic performance overview</p>
          </div>
          <div className="h-64">
            <Performance />
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-neutral-800">Announcements</h2>
          <p className="mt-0.5 text-xs text-neutral-400">Latest school announcements</p>
        </div>
        <Announcement />
      </div>
    </div>
  );
};

export default page;