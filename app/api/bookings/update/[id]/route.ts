import { connectDataBase } from "@/lib/db";
import booking from "@/models/booking";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Vehicle from "@/models/vehicle"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// updating booking status

export async function POST(req:NextRequest){
  await connectDataBase();
  const {id,status,startdate,enddate} = await req.json()
    console.log(id,status)
  const exsistingstatus = await booking.findById(id)
   if(exsistingstatus.Delivery_status === "Cancelled" && status === "Cancelled" ) return;
   if(exsistingstatus.Delivery_status === "received" && status === "received" ) return;
   if(exsistingstatus.Delivery_status === "Declined" && status === "Declined" ) return;
   if(exsistingstatus.Delivery_status === "Accepted Waiting for Delivery" && status === "Accepted Waiting for Delivery" ) return;
    try {
        const deletedItem = await booking.findByIdAndUpdate(id,{
            Delivery_status : status,
            
        },
        {new : true}
)
        if (!deletedItem) {
            alert("Status Updated")
        
        }
        alert("Status Updated")
           
      } catch (error) {
        return NextResponse.json({message:`failed to delete because ${error}`})
         
      }
     

}