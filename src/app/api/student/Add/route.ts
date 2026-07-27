import { pool } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from 'bcrypt'
export async function POST(req:Request) {
    
   const data = await req.json();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password_hash, saltRounds);
  console.log(hashedPassword);
  
   
   try  {
        await pool.query("BEGIN");

        const userResult = await pool.query(
            `
            INSERT INTO users
            (
                first_name,
                last_name,
                email,
                phone,
                password_hash,
                role_id,
                date_of_birth
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id;
            `,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                hashedPassword,
                4,
                data.date_of_birth
            ]
        );

        const userId = userResult.rows[0].id;

       

        await pool.query(
            `
            INSERT INTO students
            (
                user_id,
                registration_no,
                section_id,
                parent_id,
                address,
                blood_group,
                status
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            `,
            [
                userId,
                data.registration_number,
                data.section_id,
                data.parentId,
                data.blood_group,
                data.address,
                data.status
            ]
        );

        await pool.query("COMMIT");

        return Response.json({
            success: true,
            message:"Student Register successfully"
        });

    } catch (error) {

        await pool.query("ROLLBACK");
        console.log(error);

        return Response.json({
            success: false,
            message:"Student registeration is failed"

        });

    }  
}