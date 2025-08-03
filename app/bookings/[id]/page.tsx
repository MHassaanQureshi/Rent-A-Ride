
import Vehicle from "@/models/vehicle";
import { connectDataBase } from "@/lib/db";
import BookingClient from "../../components/BookingClient";
import React from "react";
import User from "@/models/user"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
interface VehicleType {
  
    _id: string;
    name: string;
    model: string;
    fuel_type: string;
    color: string;
    description: string;
    price: number;
    image: [];
    fromavailabilityDate: string;
    toavailabilityDate: string;
    availability: string;
    provider_id: string;
    user_id:string,
    
  };

export default async function BookingsPage({ params }: { params: { id: string } }) {
  // fetching vehicle data dynamically using vehicle id passed
  await connectDataBase();
  const vehicle = await Vehicle.findById(params.id).lean<VehicleType>();
  const provider = await User.findById(vehicle?.provider_id)
    const providername = provider?.name || "unknown"

  if (!vehicle) {
    return <div className="text-white p-4">Vehicle not found.</div>;
  }
  
  // passing fetched vehicle to booking form to book
  return <BookingClient vehicle={JSON.parse(JSON.stringify(vehicle))} providername = {providername} />;
}
