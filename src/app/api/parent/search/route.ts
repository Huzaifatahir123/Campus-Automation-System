import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { message: "Search query is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      SELECT
        p.id,
        u.first_name,
        u.last_name,
        u.phone,
        u.email
      FROM parents p
      INNER JOIN users u
        ON p.user_id = u.id
      WHERE u.phone = $1
         OR u.email = $1
      LIMIT 1;
      `,
      [query]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Parent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}