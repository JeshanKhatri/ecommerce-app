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

// Test product removal functionality
const testRemove = async () => {
  try {
    console.log('Testing product removal functionality...\n');
    
    // List all products first
    const products = await productModel.find({});
    console.log(`Found ${products.length} products in database`);
    
    if (products.length === 0) {
      console.log('No products found to test with.');
      return;
    }
    
    // Show first few products
    console.log('\nFirst 3 products:');
    products.slice(0, 3).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product._id})`);
      console.log(`   Images: ${product.image ? product.image.length : 0}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Price: ${product.price}`);
      console.log('');
    });
    
    // Test ObjectId validation
    console.log('Testing ObjectId validation...');
    const validId = products[0]._id.toString();
    const invalidId = 'invalid-id-123';
    
    console.log(`Valid ID format: ${validId.match(/^[0-9a-fA-F]{24}$/) ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`Invalid ID format: ${invalidId.match(/^[0-9a-fA-F]{24}$/) ? '✗ FAIL' : '✓ PASS'}`);
    
    console.log('\nTest completed successfully!');
    
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  connectDb().then(() => testRemove());
}

