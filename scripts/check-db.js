// Simple script to check products in the database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const products = await prisma.product.findMany();
    console.log('Total products:', products.length);
    
    if (products.length > 0) {
      console.log('Sample product:', products[0]);
    }
    
    const tshirts = await prisma.product.findMany({
      where: { category: 'tshirts' }
    });
    console.log('Tshirts count:', tshirts.length);
    
    const hoodies = await prisma.product.findMany({
      where: { category: 'hoodies' }
    });
    console.log('Hoodies count:', hoodies.length);
    
    const accessories = await prisma.product.findMany({
      where: { category: 'accessories' }
    });
    console.log('Accessories count:', accessories.length);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
