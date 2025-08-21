import mongoose from 'mongoose';
import 'dotenv/config';
import productModel from '../models/productModel.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Resize existing images to consistent dimensions
const resizeImages = async () => {
  try {
    console.log('Starting image resize process...');
    
    // Find all products
    const products = await productModel.find({});
    console.log(`Found ${products.length} products`);
    
    let processedCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      if (product.image && Array.isArray(product.image)) {
        console.log(`Processing product: ${product.name}`);
        
        for (let i = 0; i < product.image.length; i++) {
          const imagePath = product.image[i];
          if (imagePath && !imagePath.startsWith('http')) {
            try {
              const fullPath = path.join('uploads', imagePath);
              
              // Check if file exists
              if (fs.existsSync(fullPath)) {
                const outputPath = path.join('uploads', `resized_${imagePath}`);
                
                // Resize image to 400x400 while maintaining aspect ratio
                await sharp(fullPath)
                  .resize(400, 400, {
                    fit: 'cover',
                    position: 'center'
                  })
                  .jpeg({ quality: 80 })
                  .toFile(outputPath);
                
                // Replace original with resized version
                fs.unlinkSync(fullPath);
                fs.renameSync(outputPath, fullPath);
                
                console.log(`  ✓ Resized: ${imagePath}`);
                processedCount++;
              } else {
                console.log(`  ⚠ File not found: ${fullPath}`);
              }
            } catch (error) {
              console.error(`  ✗ Error processing ${imagePath}:`, error.message);
              errorCount++;
            }
          }
        }
      }
    }
    
    console.log(`\nImage resize process completed!`);
    console.log(`Successfully processed: ${processedCount} images`);
    if (errorCount > 0) {
      console.log(`Errors encountered: ${errorCount} images`);
    }
    
  } catch (error) {
    console.error('Error during image resize:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the resize process
if (import.meta.url === `file://${process.argv[1]}`) {
  connectDb().then(() => resizeImages());
}
