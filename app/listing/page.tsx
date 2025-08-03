"use client"
import { useEffect } from "react";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTransition } from 'react';
import { NextResponse } from "next/server";
import Loader from "../components/Loader";
import { randomInt } from "crypto";
interface VehicleType {
   _id:string;
    name : string,
    model : string,
    fuel_type:string,
    color: string,
    description: string,
    price : string,
    image:string[],
    fromavailabilityDate : string,
    toavailabilityDate :string,
    provider_id:string,
    Vehicletype:string,
}
interface UserType {
    name: string,
    email:string,
    phone : string,
    role :string,
    password: string,
    address: string,
}

// listing page
export default function Listing() {
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(true);
 
const [error, setError] = useState(false);
const [vehicle,setvehicle] = useState<VehicleType[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/vehicles", {
        method: "GET",
      });
      const data = await res.json();
      setvehicle(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

// filter Api
const fetchData = async () => {
    try {
      const res = await fetch("/api/vehicles", {
        method: "GET",
      });
      const data = await res.json();
      setvehicle(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
const Cartype = async(type:string)=>{
  setLoading(true)
  try{
  const data = await fetch(`/api/vehicles/filter?vehicletype=${type}`)
  
    if(data.ok){
      const body = await data.json()
      setvehicle(body)
      setLoading(false)
    }
    else{
      alert("filter failed")
    }
  }
  catch(err){
    return NextResponse.json(err)
  }
  }
const fueltype = async(type:string)=>{
   setLoading(true)
  try{
  const data = await fetch(`/api/vehicles/filter?fueltype=${type}`)
 
    if(data.ok){
      const body = await data.json()
      setvehicle(body)
      setLoading(false)
    }
    else{
      alert("filter failed")
    }
  }
  catch(err){
    return NextResponse.json(err)
  }
  }




   if (loading) return <Loader />;
  if (error) return <p>Failed to load Vehicles. Please try again later.</p>;
  return (
    <>
   <div className="w-[70%] max-w-xs flex flex-col justify-center items-center mx-auto">
  <div className="font-extrabold text-xl text-white bg-gray-800 mt-8 flex justify-center items-center p-4 rounded w-full text-center">
    <h1>AVAILABLE VEHICLES</h1>
  </div>
  <div className="flex flex-col gap-2 ">
    <p className="font-bold text-lg text-white bg-gray-800 mt-4 flex justify-center items-center p-4 rounded w-full text-center">
      Filter By
    </p>
    <div className="flex flex-col gap-4  max-h-[400px] w-full md:flex-row">
      <ul className="flex flex-col items-center justify-center gap-2 p-2 w-full">
        <li className="flex flex-col items-center w-full">
          <p className="font-bold text-lg text-white bg-gray-800 mt-2 flex justify-center items-center p-4 rounded w-full text-center">
            Vehicle Type
          </p>
          
          <span className="flex flex-row gap-2 items-center mt-3 justify-center w-full">
             <button onClick={() => fetchData()} className="bg-gray-800 text-white font-bold p-2 rounded-xl w-20">
              All
            </button>
            <button onClick={() => Cartype("car")} className="bg-gray-800 text-white font-bold p-2 rounded-xl w-20">
              Car
            </button>
            <button onClick={() => Cartype("bike")} className="bg-gray-800 text-white font-bold p-2 rounded-xl w-20">
              Bike
            </button>
            <button onClick={() => Cartype("pickup")} className="bg-gray-800 text-white font-bold p-2 rounded-xl w-20">
              Pickup
            </button>
          </span>
        </li>
      </ul>

      <ul className="flex flex-col items-center justify-center gap-2 p-2 w-full">
        <li className="flex flex-col items-center w-full">
          <p className="font-bold text-lg text-white bg-gray-800 mt-2 flex justify-center items-center p-4 rounded w-full text-center">
            Fuel Type
          </p>
          <span className="flex flex-row gap-2 items-center mt-3 justify-center w-full">
            <button onClick={() => fueltype("diesel")} className="bg-gray-800 text-white font-bold p-2 rounded-xl w-20">
              Diesel
            </button>
            <button onClick={() => fueltype("petrol")} className="bg-gray-800 text-white font-bold p-2 rounded-xl w-20">
              Petrol
            </button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>

       <div className=" text-white p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4 ">
    {
      vehicle.map((vehicle) => (
          <div key ={vehicle._id} className="bg-gray-800 text-white p-4 flex flex-col  justify-center rounded-xl gap-2 ">
            <h1 className="text-3xl capitalize"><Link href={`/listing/${vehicle._id}`}>{vehicle.name}</Link></h1>
            <img src={vehicle.image[Math.floor((Math.random()*2)+1)]} alt="unable to load" className="border-4 border-gray-800 rounded-2xl object-cover w-full h-48"/>
            <h2>Model:{vehicle.model}</h2>
            <div>Color:{vehicle.color}</div>
            <div>Fuel-Type:{vehicle.fuel_type}</div>
            
            <div>Rent Price Per Day:{vehicle.price}</div>
          </div>
      ))
    }

     </div>
   
    </>
  );
}
