import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const studentId = Number(id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid student ID",
        },
        { status: 400 }
      );
    }

    const queryText = `
      SELECT
        -- Student
        s.id AS student_id,
        s.registration_no,
        s.blood_group,
        s.address,
        s.status,
        s.created_at AS student_created_at,
        s.updated_at AS student_updated_at,

        -- User
        u.id AS user_id,
        u.first_name,
        u.last_name,
        u.phone,
        u.email,
        u.date_of_birth,
        u.is_active,

        -- Parent
        CASE
          WHEN p.id IS NULL THEN NULL
          ELSE json_build_object(
            'id', p.id,
            'occupation', p.occupation,
            'relationship', p.relationship,
            'first_name', pu.first_name,
            'last_name', pu.last_name,
            'phone', pu.phone,
            'email', pu.email,
            'date_of_birth', pu.date_of_birth
          )
        END AS parent,

        -- Section
        json_build_object(
          'id', sec.id,
          'section_name', sec.name,

          'class', json_build_object(
            'id', c.id,
            'grade', c.name
          )
        ) AS section

      FROM students AS s

      INNER JOIN users AS u
        ON s.user_id = u.id

      LEFT JOIN parents AS p
        ON s.parent_id = p.id

      LEFT JOIN users AS pu
        ON p.user_id = pu.id

      INNER JOIN sections AS sec
        ON s.section_id = sec.id

      INNER JOIN classes AS c
        ON sec.class_id = c.id

      WHERE s.id = $1
    `;

    const { rows } = await pool.query(queryText, [studentId]);

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Student not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database query error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch student details",
      },
      { status: 500 }
    );
  }
}