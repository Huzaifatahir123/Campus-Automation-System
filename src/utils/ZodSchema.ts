import { z } from "zod";

export const createStudentSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password_hash: z.string().min(8, "Password must be at least 8 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  section_id: z.string().min(1, "Please select a class & section"),
  blood_group: z.enum(
    ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    {
      message: "Please select a valid blood group",
    }
  ),

  status: z.string().min(1, "Please select status"),
});
export const createTeacherSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password_hash: z.string().min(8, "Password must be at least 8 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  salary: z.string().min(1, "Salary is required"),
  qualification: z.string().min(2, "Qualification is required"),
  joining_date: z.string().min(1, "Joining date is required"),
});
export const createParentSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password_hash: z.string().min(8, "Password must be at least 8 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),

  occupation: z.string().min(2, "Occupation is required"),
  relationship: z.string().min(2, "Relationship is required"),
});