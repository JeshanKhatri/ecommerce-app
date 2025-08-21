import 'dotenv/config';

console.log('=== Environment Variables Test ===');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('ADMIN_PASSWORD exists:', !!process.env.ADMIN_PASSWORD);
console.log('ESEWA_SECRET:', process.env.ESEWA_SECRET);
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);

console.log('\n=== Required Variables Check ===');
const required = ['PORT', 'MONGODB_URL', 'JWT_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:', missing);
  console.error('Please check your .env file');
} else {
  console.log('✅ All required environment variables are set');
}

console.log('\n=== Test Complete ===');
