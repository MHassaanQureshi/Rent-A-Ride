import { connectDataBase } from "@/lib/db";
import Vehicle from "@/models/vehicle";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req:NextRequest,{params}:{params:{id:string}}){
  await connectDataBase();
  const body = await req.json()
    console.log(body)
    // return NextResponse.json({message:`failed to delete because `})
    try {
        const updatedItem = await Vehicle.findByIdAndUpdate(params.id,body,
        {new : true}
)
        if (!updatedItem) {
            alert("Status Updated")
        
        }
        alert("Status Updated")
           
      } catch (error) {
        return NextResponse.json({message:`failed to delete because ${error}`})
         
      }

}