import fs from 'fs';
import path from 'path';
import productModel from '../models/productModel.js';
import sharp from 'sharp';

//function for add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    const imagesUrl = [];
    
    for (const item of images) {
      if (item) {
        const targetPath = path.join('uploads', item.originalname);
        
        // Resize image to consistent dimensions (400x400) while maintaining aspect ratio
        await sharp(item.path)
          .resize(400, 400, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 80 })
          .toFile(targetPath);
        
        // Remove the temporary file
        fs.unlinkSync(item.path);
        
        // Store only the filename, not the full path with uploads/
        imagesUrl.push(item.originalname);
      }
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      image: imagesUrl,
      subCategory,
      bestseller: bestseller === 'true',
      date: Date.now(),
    };

    console.log('Product data to save:', productData);

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: 'Product added' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error('List product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//function for removing product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }

    // Find the product first to get image information
    const product = await productModel.findById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log(`Attempting to remove product: ${product.name} (ID: ${id})`);

    // Delete the product from database first
    const deleteResult = await productModel.findByIdAndDelete(id);
    
    if (!deleteResult) {
      return res.status(500).json({ success: false, message: 'Failed to delete product from database' });
    }

    // Clean up image files from uploads directory
    let deletedImages = 0;
    let failedImages = 0;
    
    if (product.image && Array.isArray(product.image)) {
      for (const imagePath of product.image) {
        try {
          if (imagePath && typeof imagePath === 'string') {
            const fullImagePath = path.join('uploads', imagePath);
            if (fs.existsSync(fullImagePath)) {
              fs.unlinkSync(fullImagePath);
              console.log(`✓ Deleted image file: ${imagePath}`);
              deletedImages++;
            } else {
              console.log(`⚠ Image file not found: ${fullImagePath}`);
            }
          }
        } catch (imageError) {
          console.error(`✗ Error deleting image file ${imagePath}:`, imageError.message);
          failedImages++;
          // Continue with other images even if one fails
        }
      }
    }

    console.log(`Product removed successfully: ${product.name} (ID: ${id})`);
    console.log(`Images: ${deletedImages} deleted, ${failedImages} failed`);

    const message = `Product "${product.name}" removed successfully`;
    if (failedImages > 0) {
      message += `. Note: ${failedImages} image files could not be deleted.`;
    }

    res.json({ 
      success: true, 
      message,
      details: {
        productName: product.name,
        imagesDeleted: deletedImages,
        imagesFailed: failedImages
      }
    });

  } catch (error) {
    console.error('Remove product error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error while removing product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

//function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const product = await productModel.findById(productId);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });

  } catch (error) {
    console.error('Single product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addProduct, listProduct, removeProduct, singleProduct }