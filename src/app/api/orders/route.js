import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Order from "../../../models/orders";

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

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, type } = body;

    await connectToDatabase();
    const newOrder = new Order({
      name,
      type,
      stage: "Design", // Initial stage
    });

    await newOrder.save();
    return NextResponse.json(
      { message: "Order created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
