
import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddVehicle from "../components/AddVehicle";
import Button from "../components/Button";
import Link from "next/link";

export default async function AddVehicles(){
    const session  = await getServerSession(authOptions);
  
    if(session?.user.role === "provider"){
        return(
            <AddVehicle />
        )
    }
    if(session?.user.role === "user"){
       return(
        (
            <div className="w-full flex flex-col gap-4 items-center justify-center ">
               <div className="w-[40%] flex items-center justify-center flex-col gap-4">
                 <h1>You need to register yourself as a provider to list you vehicle</h1>
                <button className="bg-gray-800 rounded-2xl text-white p-4"><Link href="/auth/register">Register Yourself</Link></button>
               </div>
            </div>
        )
       )
    }
    if(!session?.user.role){
        return(
             <div className="w-full flex flex-col gap-4 items-center justify-center ">
               <div className="w-[40%] flex items-center justify-center flex-col gap-4">
                 <h1>You need to register yourself as a provider to list you vehicle</h1>
                <button className="bg-gray-800 rounded-2xl text-white p-4"><Link href="/auth/register">Register Yourself</Link></button>
               </div>
            </div>
        )
    }
   
}