"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Signout from "@/app/components/SignOut";
import vehicle from "@/models/vehicle";
import DashboardNav from "@/app/components/DashboardNav";
import AddSlip from "@/app/components/AddDoc";
import Bookings from "@/app/components/Bookings";
import BookingReceived from "@/app/components/BookingReceived";
import Loader from "@/app/components/Loader";
interface VehicleType {
  _id: string;
  name: string;
  model: string;
  fuel_type: string;
  color: string;
  availability: string;
  description: string;
  price: number;
  image: string[];
  fromavailabilityDate: string;
  toavailabilityDate: string;
  
}

interface BookingType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  Vehicle_id: string;
  startDate: string;
  endDate: string;
  location: string;
  totalprice: number;
  paymentmethod: string;
  Delivery_status: string;
  vehicle_name:string,
}

// dashboard for provider to show bookings made,received , and vehicle that
export default function Provider() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  
  
  const [user, setUser] = useState<any>(null);
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);
{/*fetching user API call*/}
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/my");
      const data = await res.json();
      setUser(data);
      setLoading(false)
    };
    if (status === "authenticated") {
      fetchUser();

    }
    
  }, [status]);

  {/*fetching vehicle API call*/}
  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await fetch("/api/vehicles/my");
      const data = await res.json();
      setVehicles(data);
      setLoading(false)
    };
    if (status === "authenticated" && session?.user?.role === "provider") {
      fetchVehicles();
    }
    
  }, [status, session]);

  
{/* Fetching details of received bookings to provider*/}
  


{/*delete vehicle API call*/}
  const deleteVehicle = async(id:string)=>{
    try{
    const data = await fetch(`/api/vehicles/delete/${id}`,{
      method:"DELETE"
    });
    if(data.ok){
        alert("vehicle deleted")
      
        
    }
    if(!data.ok){
        alert("vehicle not deleted")
        
    }
  }
    catch(e){
      alert(`failed to delete user ${e}`)
    }
    finally{
      setLoading(false)
    }
   }
   

  {/*Update vehicle API call*/}
  
   {/*Formatting Date*/}
 const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  if (loading) return <Loader />;
 
  if (session?.user.role === "user") redirect("/dashboard/user");

  return (
    <>
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
        
        <aside className="md:w-1/4 w-full bg-gray-900 text-white p-4">
          <DashboardNav />
        </aside>

        
        <main className="md:w-3/4 w-full p-4 overflow-x-auto">
          <div className="max-w-full">
            {/* Bookings You Have Received */}
           <BookingReceived />

            {/* Bookings */}
           <Bookings />
            {/* Vehicles */}
            {session?.user?.role === "provider" && (
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
                  Your Vehicles
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] bg-gray-800 rounded-md text-white">
                    <thead>
                      <tr>
                        {[
                          "Name",
                          "Model",
                          "Price",
                          "Color",
                          "Start Date",
                          "End Date",
                          "Availability",
                          "Fuel Type",
                          "Actions",
                        ].map((head) => (
                          <th
                            key={head}
                            className="p-2 border border-gray-700 text-sm md:text-base whitespace-nowrap"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle._id} className="border-t border-gray-700">
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {vehicle.name}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {vehicle.model}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {vehicle.price}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {vehicle.color}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {formatDate(vehicle.fromavailabilityDate)}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {formatDate(vehicle.toavailabilityDate)}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {vehicle.availability}
                          </td>
                          <td className="p-2 border border-gray-700 text-sm md:text-base">
                            {vehicle.fuel_type}
                          </td>
                          <td className="p-2 border border-gray-700 flex gap-2 justify-center">
                            <button className="bg-blue-500 p-1 rounded text-xs md:text-sm">
                              <Link href={`/editvehicle/${vehicle._id}`}>Update</Link>
                            </button>
                            <button
                              className="bg-red-600 p-1 rounded text-xs md:text-sm"
                              onClick={() => {
                                deleteVehicle(vehicle._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
