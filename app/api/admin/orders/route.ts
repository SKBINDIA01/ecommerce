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

// GET all orders (admin endpoint)
export async function GET(request: NextRequest) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        },
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
