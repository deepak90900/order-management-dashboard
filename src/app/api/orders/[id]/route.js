// src/app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import Order from "../../../../models/orders";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const stage = searchParams.get("stage");

    await connectToDatabase();
    const orders = await Order.find({ stage });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { stage } = await req.json();

    await connectToDatabase();
    await Order.findByIdAndUpdate(id, { stage });

    return NextResponse.json(
      { message: "Order stage updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order stage:", error);
    return NextResponse.json(
      { message: "Failed to update order stage" },
      { status: 500 }
    );
  }
}
