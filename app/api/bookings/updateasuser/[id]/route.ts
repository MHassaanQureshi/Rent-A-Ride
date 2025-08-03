import { connectDataBase } from "@/lib/db";
import booking from "@/models/booking";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Vehicle from "@/models/vehicle"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// updating booking status

export async function POST(req:NextRequest){
  await connectDataBase();
  const {id} = await req.json()
    console.log(id)
 
    try {
        const updateItem = await booking.findByIdAndUpdate(id,{
            providerasUserDeleted:true,
            
        },
        {new : true}
)
        if (!updateItem) {
            alert("Status Updated")
        
        }
        alert("Status Updated")
           
      } catch (error) {
        return NextResponse.json({message:`failed to delete because ${error}`})
         
      }
     

}