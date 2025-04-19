import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['orderId', 'razorpayOrderId', 'razorpayPaymentId', 'signature'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Verify the signature
    const isValid = verifyPaymentSignature(
      body.razorpayOrderId,
      body.razorpayPaymentId,
      body.signature
    );
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
    
    // Verify that the order exists and belongs to the user
    const order = await prisma.order.findUnique({
      where: {
        id: body.orderId,
        userId
      },
      include: {
        payment: true
      }
    });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update payment status
    const payment = await prisma.payment.update({
      where: { orderId: body.orderId },
      data: {
        razorpayPaymentId: body.razorpayPaymentId,
        status: 'COMPLETED'
      }
    });
    
    // Update order status
    await prisma.order.update({
      where: { id: body.orderId },
      data: {
        status: 'PROCESSING'
      }
    });
    
    return NextResponse.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
