import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";


// DELETE /api/teacher_routines/[id] - Delete a routine
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if the routine exists
    const routine = await db("teacher_routines").where("id", id).first();
    if (!routine) {
      return NextResponse.json(
        { error: "Routine not found" },
        { status: 404 }
      );
    }

    // Delete the routine
    await db("teacher_routines").where("id", id).delete();

    return NextResponse.json(
      { message: "Routine deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting routine:", error);
    return NextResponse.json(
      { error: "Failed to delete routine" },
      { status: 500 }
    );
  }
} 