"use client"
import React from "react"
import { useState  } from "react"
import { NextResponse } from "next/server"

import { useRouter } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { connectDataBase } from "@/lib/db"
import { useSession } from "next-auth/react"
export default  function AddVehicle(){
   const {data:session , status} = useSession()
    const router = useRouter()
    const toBase64 = (file: File): Promise<string> =>{
    return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

     const [formData , setformData] = useState({
            name :"",
            model : "",
            fuel_type:"",
            color: "",
            description: "",
            price :0,
            Vehicletype:"",
            provider_id:session?.user.id,
            fromavailabilityDate : "",
            toavailabilityDate :"",

})
const [images,setimages] = useState<File[]>([])
        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            setformData({...formData,[e.target.name]:e.target.value})
           
        }
        const handleSubmit = async(e:React.FormEvent)=>{
            e.preventDefault();
            const base64Images :string[] =[]
            for(const File of images){
                const Converted = await toBase64(File)
                base64Images.push(Converted)
            }

        try{
            const res = await fetch ("/api/vehicles",{
                method: "POST",
                body: JSON.stringify({...formData,image:base64Images})
            })
            if(res.ok){
               alert("ADDED SUCCESSFULLY")
               router.push("/listing")

            }
            if(!res.ok){
                return NextResponse.json({message:"failed",status:400})
            }

        }
        catch(e){
            console.log("error:",e)
        }
    }
    
    return(
        <>
         <div className="flex flex-col w-full justify-center align-middle items-center mt-20 p-4 md:mt-5 ">
                <h1 className="text-2xl w-[70%] flex items-center justify-center p-2 font-bold">SUBMIT VEHICLES DETAILS</h1>
                 <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl text-white flex flex-col justify-center align-middle w-[70%] p-4 pt-8 gap-10 items-center">
                    <input type="text" placeholder="Enter vehicle Name" value={formData.name}  onChange={handleChange} name="name" className="text-white border-b-2 border-white w-[80%]" required/>
                    <input type="text" placeholder="Enter Vehicle Model" value={formData.model}  onChange={handleChange} name="model" className="text-white border-b-2 border-white w-[80%]" required/>
                    <input type="text" placeholder="Enter fuel type" value={formData.fuel_type}  onChange={handleChange} name="fuel_type" className="text-white border-b-2 border-white w-[80%]" required/>
                    <input type="text" placeholder="Enter Car Color" value={formData.color}  onChange={handleChange} name="color" className="text-white border-b-2 border-white w-[80%]" required/>
                    <input type="text" placeholder="description" value={formData.description}  onChange={handleChange} name="description" className="text-white border-b-2 border-white w-[80%]" required/>
                    <input type="text" placeholder="vehicletype" value={formData.Vehicletype}  onChange={handleChange} name="Vehicletype" className="text-white border-b-2 border-white w-[80%]" required/>
                    {/* <input type="text" placeholder="Enter Image link" value={formData.image}  onChange={handleChange} name="image" className="text-white border-b-2 border-white w-[80%]" /> */}

                     <input type="file" multiple accept="image/*"  onChange={(e)=> setimages(Array.from(e.target.files ||[]))} name="image" className="text-white border-b-2 border-white w-[80%]" required/>
                    <input type="number" placeholder="Enter the price you want to rent vehicle for" value={formData.price}  onChange={handleChange} name="price" className="text-white border-b-2 border-white w-[80%]" required />
                    <label htmlFor="AvaForm">Available From</label>
                    <input type="date" id="AvaFrom" name="fromavailabilityDate" value={formData.fromavailabilityDate} onChange={handleChange} required/>
                    <label htmlFor="AvaTo">Available Till</label>
                    <input type="date" id="AvaTo" name="toavailabilityDate" value={formData.toavailabilityDate} onChange={handleChange} required/>
                    <button type="submit" className = "bg-white p-2 rounded-2xl text-black w-[50%]">Submit</button>
                </form>
              
               </div>
        </>
    )
}