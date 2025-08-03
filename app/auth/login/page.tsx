"use client";
import { useState} from "react";
import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Signout from "@/app/components/SignOut";
export default function Login(){
    const {data:session ,status} = useSession()
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    if(session){
        return(
             <div className="w-full flex flex-col gap-4 items-center justify-center align-middle ">
               <div className="w-[40%] flex items-center justify-center flex-col gap-4">
                 <h1>Already Logged In as {session.user.name}</h1>
                <div className="flex flex-row gap-4 items-center">
                    <button className="bg-gray-800 rounded-2xl text-white p-4"><Link href="/listing">Explore Web</Link></button>
                <Signout />
                </div>
               </div>
            </div>
        )
    }
    else{
        const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
        const data = await signIn("credentials",{
            email,
            password,
            redirect:false,
        });
        if(data?.ok){
            router.push(`/listing`)

        }
        
        else{
           alert("invalid credentials")
        }
    }
    catch(e){
        return NextResponse.json({message:`${e}`})
    }
}
return(
    <>
     <div className="flex flex-col w-full justify-center align-middle items-center mt-20 p-4 md:mt-5 ">
            <h1 className="text-2xl w-[70%] flex items-center justify-center p-2 font-bold">Sign In</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl text-white flex flex-col justify-center align-middle w-[70%] p-4 pt-8 gap-10 items-center" >
                <input type="email" placeholder="Enter your Email"  onChange={(e)=>setEmail(e.target.value)} value = {email} className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="password" placeholder="Enter Password"   onChange={(e)=>setPassword(e.target.value)} value = {password} className="text-white border-b-2 border-white w-[80%]" required/>
                <button type="submit" className = "bg-white p-2 rounded-2xl text-black w-[50%]">Submit</button>
                </form>
            <div className="flex justify-center items-center flex-col p-2">
                            <p>Don't Have an Account</p>
                            <Button link="/auth/register" name="Sign Up"/>
             </div>
           </div>
    </>
)
    }


}