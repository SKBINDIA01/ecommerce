import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Admin check middleware
const isAdmin = async (req: NextRequest) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return false;
  }
  
  // In a real application, you'd check if the user has admin role
  // For now, we'll just check if the user is authenticated
  return true;
};

// GET a single order (admin endpoint)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        },
        payment: true
      }
    });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// UPDATE an order (admin endpoint)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: params.id }
    });
    
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update the order
    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        status: body.status
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        },
        payment: true
      }
    });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
