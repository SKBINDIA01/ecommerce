import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Admin check middleware
const isAdmin = async (req: NextRequest) => {
  const { userId } = getAuth(req);
  console.log('Auth check - userId:', userId);
  
  if (!userId) {
    console.log('Auth failed: No userId found');
    return false;
  }
  
  try {
    // For demonstration purposes: treat all authenticated users as admins
    // In a real application, you would check against a database of admin users
    // Example: const isAdminUser = await prisma.user.findUnique({ where: { id: userId, role: 'ADMIN' } });
    
    // Just logging for debugging
    console.log('User authenticated successfully, granted admin access');
    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// GET all products (admin endpoint)
export async function GET(request: NextRequest) {
  try {
    if (!await isAdmin(request)) {
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
    if (!await isAdmin(request)) {
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
