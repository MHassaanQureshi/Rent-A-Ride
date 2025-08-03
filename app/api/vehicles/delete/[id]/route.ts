import { connectDataBase } from "@/lib/db";
import Vehicle from "@/models/vehicle";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bookings from "@/models/booking";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// deleting vehicle by passing id dynamically
export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    await connectDataBase();
    
    try {
      // also deleting booking from the db if the vehicle is deleted
        const deletedItem = await Vehicle.findOneAndDelete({_id:params.id})
        const deletebooking = await bookings.deleteMany({Vehicle_id : params.id})
        if (!deletedItem && !deletebooking) {
            alert("user deletion failed")
        
        }
        alert("user deletion success")
           
      } catch (error) {
        return NextResponse.json({message:`failed to delete because ${error}`})
         
      }

}
