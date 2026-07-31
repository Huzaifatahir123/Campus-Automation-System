import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface Payload {
  id: string;
  role: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const userQuery = `
      SELECT 
        u.id, 
        u.first_name, 
        u.last_name, 
        u.phone, 
        u.date_of_birth, 
        u.email, 
        r.name AS role, 
        u.password_hash 
      FROM users AS u 
      INNER JOIN roles AS r ON u.role_id = r.id 
      WHERE u.email = $1 AND u.is_active = TRUE
    `;

    const userResult = await pool.query(userQuery, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }


    const isCompare = await bcrypt.compare(password, user.password_hash);
    if (!isCompare) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const tokenPayload: Payload = { id: user.id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

  
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 2, 
    });
    const { password_hash, ...cleanUser } = user;
    if(user.role==="Admin"){
      return NextResponse.json({
      message: "User Logged in Successfully",
      data: cleanUser,
    });
    }
    let profileQuery = "";
    switch (user.role) {
      case "Student":
        profileQuery = `SELECT * FROM students WHERE user_id = $1`;
        break;
      case "Teacher":
        profileQuery = `SELECT * FROM teachers WHERE user_id = $1`;
        break;
      case "Parent":
        profileQuery = `SELECT * FROM parents WHERE user_id = $1`;
        break;
      default:
        return NextResponse.json(
          { message: "User assigned to an invalid role" },
          { status: 400 }
        );
    }

    const profileResult = await pool.query(profileQuery, [user.id]);
    const profile = profileResult.rows[0] || {};

    

    const responseData = {
      ...cleanUser,
      ...profile,
    };
     
   
   console.log(responseData);
    return NextResponse.json({
      message: "User Logged in Successfully",
      data: responseData,
    });
  } catch (error:any) {
    console.error("Login Error:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}