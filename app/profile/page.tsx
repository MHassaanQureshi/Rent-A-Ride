// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Signout from "../components/SignOut";

// interface VehicleType {
//   _id: string;
//   name: string;
//   model: string;
//   fuel_type: string;
//   color: string;
//   available: string;
//   description: string;
//   price: string;
//   image: string;
// }

// interface BookingType {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   vehicle_id: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   totalprice: number;
//   paymentmethod: string;
//   Delivery_status: string;
// }

// export default function Profile() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [vehicles, setVehicles] = useState<VehicleType[]>([]);
//   const [bookings, setBookings] = useState<BookingType[]>([]);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/login");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch("/api/user/my");
//       const data = await res.json();
//       setUser(data);
//     };
//     if (status === "authenticated") {
//       fetchUser();
//     }
//   }, [status]);

  
//   useEffect(() => {
//     const fetchVehicles = async () => {
//       const res = await fetch("/api/vehicles/my");
//       const data = await res.json();
//       setVehicles(data);
//     };
//     if (status === "authenticated" && session?.user?.role === "provider") {
//       fetchVehicles();
//     }
//   }, [status, session]);

  
//   useEffect(() => {
//     const fetchBookings = async () => {
//       const res = await fetch("/api/bookings/my");
//       if (!res.ok) return;
//       const data = await res.json();
//       setBookings(data);
//     };
   
//       fetchBookings();
    
//   }, []);

//   if (status === "loading") {
//     return <div className="text-center text-white mt-10">Loading...</div>;
//   }

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center gap-4 mt-20 text-black">
//         <h1 className="text-3xl">Hello, {session?.user?.name}</h1>
//         <h2 className="text-lg capitalize">Role: {session?.user?.role}</h2>
//         <Signout />
//       </div>

      
//       {session?.user?.role === "provider" && (
//         <div className="w-full flex flex-col items-center mt-10">
//           <h2 className="text-2xl text-black mb-4">Your Vehicles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[70%] text-white">
//             {vehicles.map((vehicle) => (
//               <div
//                 key={vehicle._id}
//                 className="bg-gray-800 p-4 rounded-xl flex flex-col gap-4"
//               >
//                 <h3 className="text-xl capitalize">
//                   <Link href={`/listing/${vehicle._id}`}>{vehicle.name}</Link>
//                 </h3>
//                 <img
//                   src={vehicle.image}
//                   alt={vehicle.name}
//                   className="border-4 border-gray-800 rounded-2xl"
//                 />
//                 <p>Model: {vehicle.model}</p>
//                 <p>Color: {vehicle.color}</p>
//                 <p>Fuel Type: {vehicle.fuel_type}</p>
//                 <p>Description: {vehicle.description}</p>
//                 <p>Price Per Day: {vehicle.price}</p>
//                 <p>Provider: {user?.name || "You"}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

      
//       <div className="w-full flex flex-col items-center mt-16">
//         <h2 className="text-2xl text-black mb-4">Your Bookings</h2>
        
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[70%] text-white">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="bg-gray-800 p-4 rounded-xl flex flex-col gap-4"
//               >
//                 <p><strong>Name:</strong> {booking.name}</p>
//                 <p><strong>Email:</strong> {booking.email}</p>
//                 <p><strong>Phone:</strong> {booking.phone}</p>
//                 <p><strong>Address:</strong> {booking.address}</p>
//                 <p><strong>Location:</strong> {booking.location}</p>
//                 <p><strong>Start Date:</strong> {booking.startDate}</p>
//                 <p><strong>End Date:</strong> {booking.endDate}</p>
//                 <p><strong>Total Price:</strong> {booking.totalprice}</p>
//                 <p><strong>Payment Method:</strong> {booking.paymentmethod}</p>
//                 <p><strong>Delivery Status:</strong> {booking.Delivery_status}</p>
//               </div>
//             ))}
//           </div>
        
//       </div>
//     </>
//   );
// }
