import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // 1. Extract search parameters from the request URL
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search'); // e.g. /api/students?search=john
    const status = searchParams.get('status'); // e.g. /api/students?status=active

    // 2. Build dynamic SQL query and values array
    const queryParams: any[] = [];
    const whereConditions: string[] = [];

    // Filter by search term (first_name, last_name, or email)
    if (search) {
      queryParams.push(`%${search}%`);
      whereConditions.push(
        `(u.first_name ILIKE $${queryParams.length} OR u.last_name ILIKE $${queryParams.length} OR u.email ILIKE $${queryParams.length})`
      );
    }

    // Filter by status
    if (status) {
      queryParams.push(status);
      whereConditions.push(`s.status = $${queryParams.length}`);
    }

    // Combine WHERE clauses if any exist
    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    const queryText = `
      SELECT 
        u.first_name,
        u.last_name,
        u.phone,
        u.email,
        u.date_of_birth,
        s.id,
        s.registration_no,
        s.blood_group,
        s.address,
        s.status 
      FROM students AS s 
      INNER JOIN users AS u ON s.user_id = u.id 
      ${whereClause}
      ORDER BY u.id ASC
    `;

    // 3. Execute query with parameterized values
    const { rows } = await pool.query(queryText, queryParams);

    // Return successful JSON response
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

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch students from database',
      },
      { status: 500 }
    );
  }
}