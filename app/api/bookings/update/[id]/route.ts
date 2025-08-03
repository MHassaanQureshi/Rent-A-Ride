import { connectDataBase } from "@/lib/db";
import booking from "@/models/booking";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDataBase();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ message: "Booking ID and status are required." }, { status: 400 });
    }

    const existingBooking = await booking.findById(id);

    if (!existingBooking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    if (existingBooking.Delivery_status === status) {
      return NextResponse.json({ message: "Status already set." }, { status: 200 });
    }

    const updatedBooking = await booking.findByIdAndUpdate(
      id,
      { Delivery_status: status },
      { new: true }
    );

    return NextResponse.json({
      message: "Booking status updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    return NextResponse.json({ message: `Update failed: ${error}` }, { status: 500 });
  }
}
