import prisma from '@/lib/db';
import { isAdminFromRequest, getUserRoleFromRequest } from '@/lib/admin';
import { NextRequest, NextResponse } from 'next/server';

// GET all products (admin endpoint)
export async function GET(request: NextRequest) {
  try {
    if (!await isAdminFromRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// CREATE a new product (admin endpoint)
export async function POST(request: NextRequest) {
  try {
    if (!await isAdminFromRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    console.log('Received product data:', body);
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'price', 'frontImageUrl'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.error(`Validation error: ${field} is required`);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Create the product
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        price: parseFloat(body.price),
        discountPercent: body.discountPercent ? parseFloat(body.discountPercent) : null,
        discountedPrice: body.discountedPrice ? parseFloat(body.discountedPrice) : null,
        frontImageUrl: body.frontImageUrl,
        backImageUrl: body.backImageUrl || null,
      }
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    // More detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create product', details: errorMessage },
      { status: 500 }
    );
  }
}
