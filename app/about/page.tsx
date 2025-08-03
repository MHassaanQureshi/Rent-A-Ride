import React from "react"
export default function About(){
    return(
        <>
       <div className = "flex flex-col items-center justify-center pt-10 pl-6 pr-6 gap-8">
         <h1 className="font-extrabold text-4xl">Welcome to Rent A Ride</h1>
        <p className="text-center"> your trusted partner for hassle-free, affordable, and convenient vehicle rentals. Whether you need a reliable ride for a day, a week, or longer, we’re here to get you moving smoothly and safely</p>
       
        <p className="text-center"> At <span className="font-bold">Rent A Ride</span>, we believe everyone deserves easy access to quality transportation without the stress. That’s why we offer a wide selection of vehicles, from compact cars perfect for city cruising to spacious SUVs for family trips. Our mission is simple: provide flexible rental options, excellent customer service, and competitive prices that keep you on the road with confidence.</p>
       </div>
        <div className = "flex flex-col justify-items-start pt-10 pl-6 pr-6 gap-2">
            <p className="font-bold">Why Choose Rent A Ride?</p>
            <p><span className="font-bold">Variety:</span> A diverse fleet to suit every need and budget</p>
            <p><span className="font-bold">Convenience:</span> Quick online booking and flexible pick-up/drop-off locations</p>
            <p><span className="font-bold">Reliability:</span> Well-maintained, clean vehicles you can count on</p>
            <p><span className="font-bold">Customer First:</span> Friendly support ready to assist you anytime</p>
        </div>
         <div className = "flex flex-col items-center justify-center pt-10 pl-6 pr-6 gap-8">
       
        <p className="text-center"> We’re passionate about making your rental experience seamless and enjoyable. Whether you’re traveling for business, planning a weekend getaway, or need a temporary ride, Rent A Ride is here to help you get where you need to go — easily and affordably.</p>
        <p className="font-bold text-2xl text-center">Thank you for choosing Rent A Ride. Let’s hit the road together!</p>
       </div>
        </>
    )
}