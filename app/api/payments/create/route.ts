import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { createRazorpayOrder, createPaymentPreferences } from '@/lib/razorpay';
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
    if (!body.orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }
    
    // Check if the order exists and belongs to the user
    const order = await prisma.order.findUnique({
      where: {
        id: body.orderId,
        userId
      },
      include: {
        user: true
      }
    });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check if payment already exists for this order
    const existingPayment = await prisma.payment.findUnique({
      where: { orderId: body.orderId }
    });
    
    // If payment exists and is completed, return error
    if (existingPayment && existingPayment.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment already completed for this order' },
        { status: 400 }
      );
    }
    
    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(order.total, order.id);
    
    // Create or update payment record
    const payment = await prisma.payment.upsert({
      where: { orderId: body.orderId },
      update: {
        amount: order.total,
        razorpayOrderId: razorpayOrder.id,
        status: 'PENDING'
      },
      create: {
        orderId: body.orderId,
        amount: order.total,
        razorpayOrderId: razorpayOrder.id,
        status: 'PENDING'
      }
    });
    
    // Generate payment preferences for UPI and other methods
    const paymentPreferences = createPaymentPreferences(
      order.user.email.split('@')[0], // Use first part of email as name if no name is provided
      order.user.email,
      body.phone // Optional phone number
    );
    
    // Return payment details with Razorpay order ID and preferences
    return NextResponse.json({
      id: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      razorpayOrderId: razorpayOrder.id,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      preferences: paymentPreferences
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
