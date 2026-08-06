"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddRecord from "@/components/AddRecord";

const EditStudentPage = () => {
  const { id } = useParams();

  const [student, setStudent] = useState<any>(null);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`/api/student/${id}`);
      setStudent(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  console.log(student);

  return (
    <div>
      <h1>Edit Student</h1>
        <AddRecord data={student} role="student" type="edit" />
      {/* Later we'll replace this with AddRecord */}
    </div>
  );
};

export default EditStudentPage;