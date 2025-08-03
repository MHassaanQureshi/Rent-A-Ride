import {connectDataBase} from "@/lib/db"
import { getServerSession } from "next-auth";

import Review from "@/models/review";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(res:NextRequest){
     await connectDataBase();
     const session = await getServerSession(authOptions);
     if(!session){
        return NextResponse.json({
            message:"unable to post review please login"
        })
     }
    const body = await res.json();
    console.log(body)
    
    const reviewdata =await Review.create(body)
    return NextResponse.json({message:"created",data:reviewdata})


}

