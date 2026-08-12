import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";

    const queryText = `
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.phone,
        u.email,
        u.date_of_birth,
        p.relationship,
        p.occupation
      FROM parents AS p
      INNER JOIN users AS u
        ON p.user_id = u.id
      WHERE
        u.first_name ILIKE $1
        OR u.last_name ILIKE $1
        OR u.phone ILIKE $1
        OR u.email ILIKE $1
        OR p.relationship ILIKE $1
        OR p.occupation ILIKE $1
      ORDER BY u.id ASC
    `;

    const searchValue = `%${search}%`;

    const { rows } = await pool.query(queryText, [searchValue]);

    return NextResponse.json(
      {
        success: true,
        data: rows,
        count: rows.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database query error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch parents from database",
      },
      { status: 500 }
    );
  }
}