import { connectDataBase } from "@/lib/db";
import Review from "@/models/review"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bookings from "@/models/booking";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// deleting review by passing id dynamically
export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    await connectDataBase();
    
    try {
      // also deleting booking from the db if the vehicle is deleted
        const deletedItem = await Review.findOneAndDelete({_id:params.id})
       
        if (!deletedItem ) {
            alert("Review deletion failed")
        
        }
        alert("Review deletion success")
           
      } catch (error) {
        return NextResponse.json({message:`failed to delete because ${error}`})
         
      }

}