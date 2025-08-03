"use client";
import { useState} from "react";
import { NextResponse } from "next/server";
import Button from "@/app/components/Button";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserForm(){
   const router = useRouter();
   const {data:session , status} = useSession()
   
   
    const [formData , setformData] = useState({
    name: "",
    email:"",
    phone :"",
    role :"",
    password: "",
    address:"",});
    const [providerformData , setproviderformData] = useState({
    id:session?.user.id,
    name: session?.user.name,
    email:session?.user.email,
    phone :"",
    role :"provider",
    password: "",
    address:"",});
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setformData({...formData,[e.target.name]:e.target.value})
        setproviderformData({...providerformData, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

    try{
        const res = await fetch ("/api/user",{
            method: "POST",
            body: JSON.stringify(formData)
        })
        if(res.ok){
           alert("account created successfully")
           if(formData.role === "provider"){
            router.push("/add-vehicles")
           }
           else{
            router.push("/auth/login")
           }

        }
        else{
            return NextResponse.json({message:"failed",status:400})
        }
        
    }
    catch(e){
        console.log("error:",e)
    }
  
}
    
 const handleproviderSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
          try{
        const res = await fetch("/api/user/update",{
            method:"POST",
            headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(providerformData)
        })
        if(res.ok){
            alert("registration successful")
            redirect("/auth/login")
        }
        if(!res.ok){
            alert("registration failed")
            redirect("/register")
        }
    }
    catch(e){
        console.log(e)
    }
 }
if(session?.user.role === "user"){
   return(
    <>
     <div className="flex flex-col w-full justify-center align-middle items-center mt-20 p-4 md:mt-5 ">
            <h1 className="text-2xl w-[70%] flex items-center justify-center p-2 font-bold">Register As Provider</h1>
             <form onSubmit={handleproviderSubmit} className="bg-gray-800 rounded-xl text-white flex flex-col justify-center align-middle w-[70%] p-4 pt-8 gap-10 items-center">
                <input type="text" placeholder="Enter your Username" value={session?.user.name}  onChange={handleChange} name="name" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="email" placeholder="Enter your Email" value={session?.user.email}  onChange={handleChange} name="email" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="password" placeholder="Enter Password" value={formData.password}  onChange={handleChange} name="password" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="tel" placeholder="Phone No" value={formData.phone}  onChange={handleChange} name="phone" className="text-white border-b-2 border-white w-[80%]" required/>
               
                <input type="string" placeholder="enter you address" value={formData.address}  onChange={handleChange} name="address" className="text-white border-b-2 border-white w-[80%]" required />
                <button type="submit" className = "bg-white p-2 rounded-2xl text-black w-[50%]">Submit</button>
               
            </form>
            <div className="flex justify-center items-center flex-col p-2">
                <p>Already Have an Account</p>
                <Button link="/auth/login" name="Sign in"/>

            </div>
           </div>
    </>
)
}
if(!session?.user.role){
    return(
    <>
     <div className="flex flex-col w-full justify-center align-middle items-center mt-20 p-4 md:mt-5 ">
            <h1 className="text-2xl w-[70%] flex items-center justify-center p-2 font-bold">Sign Up</h1>
             <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl text-white flex flex-col justify-center align-middle w-[70%] p-4 pt-8 gap-10 items-center">
                <input type="text" placeholder="Enter your Username" value={session?.user.name}  onChange={handleChange} name="name" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="email" placeholder="Enter your Email" value={session?.user.email}  onChange={handleChange} name="email" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="password" placeholder="Enter Password" value={formData.password}  onChange={handleChange} name="password" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="tel" placeholder="Phone No" value={formData.phone}  onChange={handleChange} name="phone" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="string" placeholder="provider or user" value={formData.role}  onChange={handleChange} name="role" className="text-white border-b-2 border-white w-[80%]" required/>
                <input type="string" placeholder="enter you address" value={formData.address}  onChange={handleChange} name="address" className="text-white border-b-2 border-white w-[80%]" required />
                <button type="submit" className = "bg-white p-2 rounded-2xl text-black w-[50%]">Submit</button>
            </form>
            <div className="flex justify-center items-center flex-col p-2">
                <p>Already Have an Account</p>
                <Button link="/auth/login" name="Sign in"/>

            </div>
           </div>
    </>
)
}
if(session.user.role === "provider"){
    return(
        <h1>Already Registered</h1>
    )
}
}
