// "use client"
// import { useSession } from "next-auth/react";
// import react from "react";
// import { useEffect,useState } from "react";
// import bookings from "@/models/booking";


// interface BookingType{
//   _id:string,
//    name:String,
//               email:string,
//               phone:string,
//               address:string,
//               vehicle_id :string,
//               startDate:string,
//               endDate:string,
//               location:string,
//               totalprice:number,
//               paymentmethod:string,
//               Delivery_status:string,
//               vehicle_name:string,
              
// }

// export default function Bookings(){
//     const {data:session , status} = useSession()
//     const [booking,setbookings] = useState<BookingType[]>([]);
//     useEffect(()=>{
//         const fetchbooking = async()=>{
//             const bookingdata = await fetch("/api/bookings")
//             const data= await bookingdata.json()
//             setbookings(data)
            
//         }
//         fetchbooking()
//         console.log(booking)
//     },[])

//     // if(booking){
//     //     return(
//     // {
//     //     booking.map((booking) => (
//     //       <div key ={booking._id} className="bg-gray-800 text-white p-4 flex flex-col  justify-center rounded-xl gap-6 ml-40">
//     //         <img src={booking.email} alt="unable to load" className="border-4 border-gray-800 rounded-2xl"/>
//     //         <h2>Model:{booking.address}</h2>
//     //         <div>Color:{booking.Delivery_status}</div>
//     //         <div>Fuel-Type:{booking.location}</div>
//     //         <div>Description:{booking.startDate}</div>
//     //         <div>Rent Price Per Day:{booking.endDate}</div>
            
//     //       </div>
//     //   ))
//     // }
//     //     )
//     // }
    
// }