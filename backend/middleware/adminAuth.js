import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    console.log('AdminAuth middleware called');
    console.log('Headers:', req.headers);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found');
      return res.status(401).json({success: false, message: "No auth token provided"});
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token ? '***' : 'NOT_FOUND');
    
    if (!process.env.JWT_SECRET) {
      console.log('JWT_SECRET environment variable is not set');
      return res.status(500).json({success: false, message: "Server configuration error"});
    }
    
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    // Check if the user is an admin
    if (!token_decode.isAdmin) {
      console.log('User is not admin:', token_decode);
      return res.status(403).json({success: false, message: "Not authorized as admin"});
    }
    
    console.log('Admin authentication successful');
    // Add user info to request for use in controllers
    req.user = token_decode;
    next();
  } catch (error) {
    console.log('AdminAuth error:', error);
    res.status(401).json({success: false, message: error.message});
  }
}

export default adminAuth;
