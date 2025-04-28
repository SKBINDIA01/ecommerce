// Test database connection and add sample products if needed
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing database connection...');
    
    // Test connection by querying products
    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products in the database.`);
    
    // Check for t-shirts specifically
    const tshirts = await prisma.product.findMany({
      where: { category: 'tshirts' }
    });
    console.log(`Found ${tshirts.length} t-shirts in the database.`);
    
    // If no t-shirts, add some sample ones
    if (tshirts.length === 0) {
      console.log('No t-shirts found. Adding sample t-shirts...');
      
      // Sample t-shirts data
      const sampleTshirts = [
        {
          name: "Urban Graphic Tee",
          description: "Stylish urban graphic t-shirt with premium quality fabric.",
          category: "tshirts",
          price: 29.99,
          discountPercent: 10,
          discountedPrice: 26.99,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: "/placeholder.svg?height=400&width=300"
        },
        {
          name: "Street Style Tee",
          description: "Comfortable street style t-shirt for everyday wear.",
          category: "tshirts",
          price: 34.99,
          frontImageUrl: "/placeholder.svg?height=400&width=300"
        },
        {
          name: "Casual Fit Tee",
          description: "Relaxed fit casual t-shirt made with soft cotton.",
          category: "tshirts",
          price: 27.99,
          discountPercent: 15,
          discountedPrice: 23.79,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: "/placeholder.svg?height=400&width=300"
        },
        {
          name: "Vintage Print Tee",
          description: "Classic vintage print t-shirt with retro design.",
          category: "tshirts",
          price: 32.99,
          frontImageUrl: "/placeholder.svg?height=400&width=300"
        }
      ];
      
      // Add t-shirts to database
      for (const tshirt of sampleTshirts) {
        await prisma.product.create({
          data: tshirt
        });
        console.log(`Added t-shirt: ${tshirt.name}`);
      }
      
      console.log('Sample t-shirts added successfully!');
    }
    
    console.log('Database test completed successfully!');
  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
