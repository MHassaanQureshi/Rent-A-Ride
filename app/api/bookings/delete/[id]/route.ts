import { connectDataBase } from "@/lib/db";
import bookings from "@/models/booking";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // or import your real providers

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export async function DELETE(req: NextRequest) {
  await connectDataBase();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ✅ Extract the ID from the URL
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // assumes URL ends with the ID

  if (!id) {
    return NextResponse.json({ message: "Missing ID in URL" }, { status: 400 });
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
      { _id: id },
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
      const deletedBooking = await bookings.findOneAndDelete({ _id: id });
      return NextResponse.json({ message: "Booking fully deleted", data: deletedBooking });
    }

    return NextResponse.json({ message: "Booking updated", data: updatedBooking });
  } catch (error) {
    return NextResponse.json({ message: `Failed to delete because ${error}` }, { status: 500 });
  }
}
