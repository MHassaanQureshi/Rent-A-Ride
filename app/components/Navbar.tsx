"use client";
import Link from "next/link"
import {useState} from "react"
import { useSession } from "next-auth/react";

export default  function Navbar(){
    const [open,setopen] = useState(false)
    const {data:session ,status} = useSession()


    return(
        <>
        <div className="hidden w-full justify-between  items-center align-middle bg-gray-800 text-white p-6 md:flex ">
            <h1 className="text-2xl font-extrabold"><Link href="/">Rent A Ride</Link></h1>
            <span>
                <ul className="flex flex-row  items-center gap-4 align-middle ">
                   <li><Link href="/about" >About </Link></li>
                   <li><Link href="/listing" >Vehicles</Link></li>
                   <li><Link href="/auth/login">Login</Link></li>
                   <li><Link href="/auth/register">register</Link></li>
                   
                   <li><Link href="/add-vehicles">Add vehicle</Link></li>
                   {/* {session && (<li><Signout /></li>)} */}
                    {session?.user.role === "provider" && (
                    <li><Link href="/dashboard/provider">Dashboard</Link></li>)
                    }
                    {session?.user?.role === "user" &&(
                    <li><Link href="/dashboard/user">Dashboard</Link></li>)
                    }
                    

                </ul>
            </span>
        </div>

      <div className="w-full flex justify-between align-middle bg-gray-800 text-white p-6 md:hidden ">
            <h1 className="text-2xl font-extrabold"><Link href="/">Rent A Ride</Link></h1>
           {
            open === false &&  <button onClick={()=>setopen(true)}>V</button>
           }
           {
            open === true &&  <button onClick={()=>setopen(false)}>X</button>
           }
            </div>
             {open &&(   <span>
                <ul className="flex flex-col  justify-center gap-4 bg-gray-800 rounded-b-xl text-white align-middle p-4">
                   <li><Link href="/about" >About </Link></li>
                   <li><Link href="/listing" >Vehicles</Link></li>
                  
                 
                   <li><Link href="/auth/login">Login</Link></li>
                   <li><Link href="/auth/register">register</Link></li>
                  
                   <li><Link href="/add-vehicles">Add vehicle</Link></li>
                  {/* {session && (<li><Signout /></li>)} */}
                     {session?.user?.role === "provider" &&(
                    <li><Link href="/dashboard/provider">Dashboard</Link></li>)
                    }
                     {session?.user?.role === "user" &&(
                    <li><Link href="/dashboard/user">Dashboard</Link></li>)
                    }
                    
                </ul>
               
            </span>
        )
        }
        </>
    )
}