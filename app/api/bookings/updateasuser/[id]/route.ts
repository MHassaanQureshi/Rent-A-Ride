import { connectDataBase } from "@/lib/db";
import booking from "@/models/booking";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDataBase();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Booking ID is required." }, { status: 400 });
    }

    const updatedBooking = await booking.findByIdAndUpdate(
      id,
      { providerasUserDeleted: true },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Booking marked as deleted by provider.",
      booking: updatedBooking,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Failed to update booking: ${error}`,
    }, { status: 500 });
  }
}
