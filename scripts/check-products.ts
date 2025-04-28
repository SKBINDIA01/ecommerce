import prisma from '../lib/db';

async function checkProducts() {
  try {
    // Get all products
    const allProducts = await prisma.product.findMany();
    console.log('Total products:', allProducts.length);
    
    // Get products by category
    const categories = ['tshirts', 'hoodies', 'accessories'];
    
    for (const category of categories) {
      const products = await prisma.product.findMany({
        where: { category }
      });
      console.log(`Products in category "${category}":`, products.length);
      
      if (products.length === 0) {
        console.log(`No products found in category "${category}"`);
      } else {
        console.log(`First product in "${category}":`, products[0]);
      }
    }
  } catch (error) {
    console.error('Error checking products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProducts();
