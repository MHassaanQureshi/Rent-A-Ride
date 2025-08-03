import { connectDataBase } from "@/lib/db";
import bookings from "@/models/booking";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDataBase();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const bookingId = context.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return NextResponse.json({ message: "Invalid Booking ID" }, { status: 400 });
  }

  try {
    let updateField: any = {};

    if (session.user.role === "provider") {
      updateField = { providerDeleted: true };
    } else if (session.user.role === "user") {
      updateField = { userDeleted: true };
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedBooking = await bookings.findOneAndUpdate(
      { _id: bookingId },
      { $set: updateField },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (
      (updatedBooking.userDeleted && updatedBooking.providerDeleted) ||
      (updatedBooking.providerasUserDeleted && updatedBooking.providerDeleted)
    ) {
      const deletedBooking = await bookings.findOneAndDelete({ _id: bookingId });
      return NextResponse.json({ message: "Booking fully deleted", data: deletedBooking });
    }

    return NextResponse.json({ message: "Booking updated", data: updatedBooking });

  } catch (error) {
    return NextResponse.json({ message: `Failed to delete: ${error}` }, { status: 500 });
  }
}
