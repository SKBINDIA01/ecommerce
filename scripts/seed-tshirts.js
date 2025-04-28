// Seed script to add sample t-shirts to the database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting to seed t-shirts...');
    
    // Sample t-shirts data
    const tshirts = [
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
        discountPercent: null,
        discountedPrice: null,
        frontImageUrl: "/placeholder.svg?height=400&width=300",
        backImageUrl: null
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
        discountPercent: null,
        discountedPrice: null,
        frontImageUrl: "/placeholder.svg?height=400&width=300",
        backImageUrl: null
      }
    ];
    
    // Create t-shirts in the database
    for (const tshirt of tshirts) {
      await prisma.product.upsert({
        where: { 
          // Use name as a unique identifier for upsert
          name: tshirt.name 
        },
        update: tshirt,
        create: tshirt
      });
    }
    
    console.log('T-shirts seeded successfully!');
    
    // Check if t-shirts were added
    const dbTshirts = await prisma.product.findMany({
      where: { category: 'tshirts' }
    });
    
    console.log(`Found ${dbTshirts.length} t-shirts in the database.`);
    
  } catch (error) {
    console.error('Error seeding t-shirts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
