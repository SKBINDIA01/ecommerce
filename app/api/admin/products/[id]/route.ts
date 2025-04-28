import prisma from '@/lib/db';
import { isAdminFromRequest } from '@/lib/admin';
import { NextRequest, NextResponse } from 'next/server';

// GET a single product (admin endpoint)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdminFromRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// UPDATE a product (admin endpoint)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdminFromRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Update the product
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        price: body.price ? parseFloat(body.price) : undefined,
        discountPercent: body.discountPercent ? parseFloat(body.discountPercent) : null,
        discountedPrice: body.discountedPrice ? parseFloat(body.discountedPrice) : null,
        frontImageUrl: body.frontImageUrl,
        backImageUrl: body.backImageUrl || null,
      }
    });
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE a product (admin endpoint)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdminFromRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Delete the product
    await prisma.product.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
