import { connectDataBase } from "@/lib/db";
import Review from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

// Delete review by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDataBase();

    const deletedItem = await Review.findOneAndDelete({ _id: params.id });

    if (!deletedItem) {
      return NextResponse.json(
        { message: "Review deletion failed. Review not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Review deleted successfully.", data: deletedItem },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to delete review: ${error}` },
      { status: 500 }
    );
  }
}
