import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';


export async function GET() {
  try {

    const queryText = `
  SELECT 
    u.first_name,
    u.last_name,
    u.phone,
    u.email,
    u.date_of_birth,
    p.relationship,
    p.occupation
  FROM parents AS p 
  INNER JOIN users AS u ON p.user_id = u.id 
  ORDER BY u.id ASC
`;
    const { rows } = await pool.query(queryText);

 
    return NextResponse.json(
      {
        success: true,
        data: rows,
        count: rows.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database query error:', error);

    //* Return error response
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch parents from database',
      },
      { status: 500 }
    );
  }
}