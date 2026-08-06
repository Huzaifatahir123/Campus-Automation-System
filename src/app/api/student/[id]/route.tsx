import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.registration_no As registration_number,
        s.blood_group,
        s.section_id,
        s.parent_id,
        s.address,
        s.status,

        u.first_name,
        u.last_name,
        u.phone,
        u.email,
        TO_CHAR(u.date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
        u.password_hash

      FROM students s
      INNER JOIN users u
      ON s.user_id = u.id

      WHERE s.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}