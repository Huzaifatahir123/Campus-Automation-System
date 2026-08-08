import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  

  try {
    const { id } = await params;

    const body = await req.json();

    const {
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,

      registration_number,
      parent_id,
      address,
      section_id,
      blood_group,
      status,
    } = body;

    await pool.query("BEGIN");

    // Get the related user_id
    const studentResult = await pool.query(
      `SELECT user_id FROM students WHERE id = $1`,
      [id]
    );

    if (studentResult.rows.length === 0) {
      await pool.query("ROLLBACK");

      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const userId = studentResult.rows[0].user_id;

    // Update users table
    await pool.query(
      `
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        phone = $3,
        email = $4,
        date_of_birth = $5
      WHERE id = $6
      `,
      [
        first_name,
        last_name,
        phone,
        email,
        date_of_birth,
        userId,
      ]
    );
    await pool.query(
      `
      UPDATE students
      SET
        registration_no = $1,
        parent_id = $2,
        address = $3,
        section_id = $4,
        blood_group = $5,
        status = $6
      WHERE id = $7
      `,
      [
        registration_number,
        parent_id,
        address,
        section_id,
        blood_group,
        status,
        id,
      ]
    );

    await pool.query("COMMIT");

    return NextResponse.json(
      {
        message: "Student updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  } 
}