import { NextResponse, NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT 
        s.id AS section_id,
        c.name AS class_name,
        s.name AS section_name,
        CONCAT(c.name, ' - Section ', s.name) AS display_label
      FROM sections s
      JOIN classes c ON s.class_id = c.id
      ORDER BY c.id ASC, s.name ASC;
    `;

    const result = await pool.query(query);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { error: "Failed to fetch sections and classes" },
      { status: 500 }
    );
  }
}