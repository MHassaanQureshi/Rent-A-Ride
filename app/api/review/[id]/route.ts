import mongoose from "mongoose";
import { connectDataBase } from "@/lib/db";
import Review from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDataBase();

    const vehicleId = params.id;

    if (!vehicleId) {
      return NextResponse.json(
        { message: "Vehicle ID parameter is missing." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return NextResponse.json(
        { message: "Invalid vehicle ID." },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ Vehicle_id: vehicleId });

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews found for this vehicle." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Reviews retrieved successfully.",
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
