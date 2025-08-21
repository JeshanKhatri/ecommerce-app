import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Token valid for 7 days
}

// route for user login
const loginUser = async (req, res) => {
try {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if (!user) {
        return res.json({success: false, message: "User does not exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
   
    if (isMatch) {
        const token = createToken(user._id);
        res.json({success: true, token})
    }
    else{
        res.json({success: false, message:"Invalid credentials"})
    }

} catch (error) {
    console.log(error);
    res.json({success: false, message:error.message})
}
}

// route for user registration
const registerUser = async (req, res) => {

    try{
 
        const {name, email, password} = req.body;

        //checking user already exist or not
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({sucess:false, message:"user exists3"})
        }

        // validate email & strong password
        if (!validator.isEmail(email)) {
               return res.json({sucess:false, message:" Enter a valid email "})
        }

        if (password.length < 8) {
            return res.json({sucess:false, message:" Password must be strong "})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id);

        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({sucess:false, message:error.message})
        }
}

// route for admin login 
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Admin login attempt:', { email, password });
    console.log('Environment variables:', { 
      ADMIN_EMAIL: process.env.ADMIN_EMAIL, 
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '***' : 'NOT_SET' 
    });

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Include isAdmin: true
      const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Admin login successful, token created');
      res.status(200).json({ success: true, token });
    } else {
      console.log('Admin login failed: invalid credentials');
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log('Admin login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// const adminLogin = async (req, res) => {
// try {
//     const {email, password} = req.body;
//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//         const token = jwt.sign(email+password, process.env.JWT_SECRET);
//         res.json({success:true, token})
//     }else{
//         res.json({success:true, message:"Admin login successful"})
//     }
// } catch (error) {
//     console.log(error);
//     res.json({sucess:false, message:error.message})
// }
// }
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(200).json({ success: true, token });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


export { loginUser, registerUser, adminLogin }

// get current logged in user info
const getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No auth token provided' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
}

export { getCurrentUser }