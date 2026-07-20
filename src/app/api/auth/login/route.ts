import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcrypt" 
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken"
import {cookies} from "next/headers";

interface payload {
    id:string;
    role:string
}
export async function POST(req:NextResponse){
    try {
            const body = await req.json();
    const {email,password} = body;
    if(!email || !password){
        return NextResponse.json({message:"email or password is wrong"},{status:400})
    }
    const query = `SELECT u.id , u.first_name , u.email ,r.name As role , u.password_hash from users AS u INNER JOIN roles AS r ON u.role_id = r.id WHERE u.email = $1  AND u.is_Active = TRUE `
    const user = (await pool.query(query,[email])).rows[0];
    console.log(user)
    if(!user){
        return NextResponse.json({message:"User does not found"},{status:404})
    }
    const isCompare  = await bcrypt.compare(password,user.password_hash);
    if(!isCompare){
       return NextResponse.json({message:"email or password is wrong"},{status:404})
    }
    const tokenPayload : payload = {id:user.id,role:user.role}
   
    const token = jwt.sign(tokenPayload,process.env.JWT_SECRET!,{
    expiresIn: '2h',
    algorithm: 'HS256'
    });
    const cookieStore = await cookies();
    cookieStore.set({
        name:"token",
        value:token,
        httpOnly:true,
        path:"/",
        sameSite: 'lax',
    maxAge: 60 * 60 * 2,
    })
    
    return NextResponse.json({
        message:"User Logged in Successfully",
        data:{
            id: user.id,
    first_name: user.first_name,
    email: user.email,
    role: user.role
        }
    })
   
        
    } catch (error) {
        console.error(error);
       return NextResponse.json({message:"internal server error"},{status:500});
    }

}