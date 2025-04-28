import prisma from '@/lib/db';
import { isAdminFromRequest } from '@/lib/admin';
import { NextRequest, NextResponse } from 'next/server';

// GET all orders (admin endpoint)
export async function GET(request: NextRequest) {
  try {
    if (!await isAdminFromRequest(request)) {
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
