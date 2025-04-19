import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import prisma from './db';

interface ProductCSV {
  'Design Category': string;
  'Name of Design': string;
  'Front': string;
  'Back': string;
  'Price': string;
  'Initial discount (now only)': string;
  'Discounted Price': string;
  'Description': string;
}

async function importProductsFromCSV() {
  console.log('Importing products from CSV file...');
  
  return new Promise((resolve, reject) => {
    const products: ProductCSV[] = [];
    
    // Read CSV file
    fs.createReadStream(path.join(process.cwd(), 'public', 'URBAN FYNIX DESIGNS COLLECTION (1).csv'))
      .pipe(csv())
      .on('data', (data: ProductCSV) => products.push(data))
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        reject(error);
      })
      .on('end', async () => {
        console.log(`Found ${products.length} products`);
        
        try {
          // Delete existing products
          await prisma.product.deleteMany({});
          console.log('Cleared existing products');
          
          // Insert new products
          for (const product of products) {
            const price = parseFloat(product['Price']);
            const discountPercent = product['Initial discount (now only)']?.replace('%', '') || '';
            const discountedPrice = parseFloat(product['Discounted Price']);
            
            // Skip rows with invalid data
            if (isNaN(price) || !product['Name of Design']) {
              console.log(`Skipping invalid product: ${product['Name of Design']}`);
              continue;
            }
            
            // Replace any invalid image URLs with placeholders
            const frontImageUrl = !product['Front'] || product['Front'].includes('xxxxxxxxx') 
              ? '/placeholder.jpg' 
              : product['Front'];
              
            const backImageUrl = !product['Back'] || product['Back'].includes('xxxxxxxxx') 
              ? null 
              : product['Back'];
            
            await prisma.product.create({
              data: {
                name: product['Name of Design'],
                description: product['Description'] || 'No description available',
                category: product['Design Category'] || 'uncategorized',
                price,
                discountPercent: discountPercent ? parseFloat(discountPercent) : null,
                discountedPrice: !isNaN(discountedPrice) ? discountedPrice : null,
                frontImageUrl,
                backImageUrl,
              }
            });
          }
          
          console.log('Products imported successfully!');
          resolve(true);
        } catch (error) {
          console.error('Error importing products:', error);
          reject(error);
        } finally {
          await prisma.$disconnect();
        }
      });
  });
}

// Execute the import function if this file is run directly
if (require.main === module) {
  importProductsFromCSV()
    .catch(console.error);
}

export { importProductsFromCSV };
