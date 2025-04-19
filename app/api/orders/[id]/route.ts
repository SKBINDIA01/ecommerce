import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET a single order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(request);
    
    // For order success page, we allow fetching without authentication
    // But we only include minimal information for security
    const isAuthenticated = !!userId;
    
    const order = await prisma.order.findUnique({
      where: { 
        id: params.id,
        // Only filter by userId if user is authenticated
        ...(isAuthenticated ? { userId } : {})
      },
      include: {
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
