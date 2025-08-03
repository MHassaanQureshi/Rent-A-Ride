import { connectDataBase } from "@/lib/db";
import bookings from "@/models/booking";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDataBase();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    // Update the booking's deletion flag
    const updatedBooking = await bookings.findOneAndUpdate(
      { _id: params.id },
      { $set: updateField },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    // If both userDeleted and providerDeleted are true, delete the booking
    if (updatedBooking.userDeleted === true && updatedBooking.providerDeleted === true) {
      const deletedBooking = await bookings.findOneAndDelete({ _id: params.id });
      return NextResponse.json({ message: "Booking fully deleted", data: deletedBooking });
    }
    if (updatedBooking.providerasUserDeleted === true && updatedBooking.providerDeleted === true) {
      const deletedBooking = await bookings.findOneAndDelete({ _id: params.id });
      return NextResponse.json({ message: "Booking fully deleted", data: deletedBooking });
    }

    return NextResponse.json({ message: "Booking updated", data: updatedBooking });

  } catch (error) {
    return NextResponse.json({ message: `Failed to delete because ${error}` }, { status: 500 });
  }
}
