import mongoose from 'mongoose';
import 'dotenv/config';
import productModel from '../models/productModel.js';

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

// Fix image paths by removing uploads/ prefix
const fixImagePaths = async () => {
  try {
    console.log('Starting image path fix...');
    
    // Find all products
    const products = await productModel.find({});
    console.log(`Found ${products.length} products`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      if (product.image && Array.isArray(product.image)) {
        let needsUpdate = false;
        const fixedImages = product.image.map(imgPath => {
          if (imgPath && (imgPath.startsWith('uploads/') || imgPath.startsWith('uploads\\'))) {
            needsUpdate = true;
            // Remove uploads/ prefix and normalize slashes
            return imgPath.replace(/^uploads[\/\\]/i, '').replace(/\\/g, '/');
          }
          return imgPath;
        });
        
        if (needsUpdate) {
          await productModel.findByIdAndUpdate(product._id, { image: fixedImages });
          console.log(`Fixed product: ${product.name} - Images: ${fixedImages.join(', ')}`);
          updatedCount++;
        }
      }
    }
    
    console.log(`\nImage path fix completed!`);
    console.log(`Updated ${updatedCount} products`);
    
  } catch (error) {
    console.error('Error fixing image paths:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the fix
if (import.meta.url === `file://${process.argv[1]}`) {
  connectDb().then(() => fixImagePaths());
}
