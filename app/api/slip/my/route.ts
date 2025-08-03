import { connectDataBase } from "@/lib/db";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import Slip from "@/models/documents";

// fetching slips from db based on booking id
export async function GETBYID(req: NextRequest, id: string) {
  
    await connectDataBase();

   
    const SlipDoc = await (await Slip.findOne({ booking_id: id }))
    console.log(SlipDoc)

    if (!SlipDoc) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    else{
        return NextResponse.json({message:"found",data:SlipDoc})
    }
    
}
