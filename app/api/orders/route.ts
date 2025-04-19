import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET all orders for current user
export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
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

// CREATE a new order
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
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order items are required' },
        { status: 400 }
      );
    }
    
    // Get products from database to verify pricing
    const productIds = body.items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    });
    
    // Map products by ID for easier lookup
    const productsMap = products.reduce((acc: any, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
    
    // Calculate total and prepare order items
    let total = 0;
    const orderItems = body.items.map((item: any) => {
      const product = productsMap[item.productId];
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      
      const price = product.discountedPrice || product.price;
      const itemTotal = price * item.quantity;
      total += itemTotal;
      
      return {
        productId: item.productId,
        quantity: item.quantity,
        price
      };
    });
    
    // Create the order with items and shipping information
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        shippingEmail: body.shipping?.email,
        shippingName: body.shipping?.name,
        shippingAddress: body.shipping?.address,
        shippingCity: body.shipping?.city,
        shippingState: body.shipping?.state,
        shippingPostalCode: body.shipping?.postalCode,
        shippingCountry: body.shipping?.country,
        shippingPhone: body.shipping?.phone,
        orderItems: {
          create: orderItems
        }
      },
      include: {
        orderItems: true
      }
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
