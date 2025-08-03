
import Image from "next/image";
import Button from "./components/Button";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
const session = await getServerSession(authOptions)
  return (
    <div className="w-full max-h-full flex items-center">
      <div className="flex flex-col w-full justify-center items-center p-4 mt-[20%] md:mt-[10%]">
        <h1 className="text-2xl font-extrabold">WELCOME TO RENT A RIDE</h1>
        <div className="w-[70%] p-4 flex items-center justify-center mt-10">
          <img src="https://car-rental-website-five.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FCar(2).bd07489a.jpg&w=1200&q=100" alt="unable to load" className="w-[40rem]"/>
        </div>
        <div className="flex flex-col gap-4 p-4 mt-10 md:flex-row md:mt-0">
          <Button link="/listing" name="Explore" />
          <Button link="/auth/register" name="Sign-up and place your car for rent" />
        </div>
        
      </div>
    </div>
  );
}
