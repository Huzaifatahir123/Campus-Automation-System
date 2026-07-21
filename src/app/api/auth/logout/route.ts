import {NextResponse,NextRequest} from "next/server";
export async function POST(req:NextRequest){
    const response = NextResponse.json({
        message:"Logout Successfully",
        status:200
    })
    response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0),
         path:"/"
    })
    return response 
}