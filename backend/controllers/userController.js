import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt';
import connectedDB from '../config/db.js';

export const index = (req, res) => {
  res.json('start');
};

export const authUser = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const token = generateToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,  // 只能服务器端获取
      sameSite: 'strict',   // 完全禁止第三方获取cookies
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 多少时间后失效
    })
    .status(201)
    .json({
      _id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    })
    ;
  } else {
    res.status(401).json('Invalid email or password');
    console.log('Invalid email or password');
  }
}

export const register = async(req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.find({email: email});
  // 返回数组
  if (userExist.length) {
    res.status(400).json('User already exists');
    throw new Error('User already exists');
  };
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json('user create success!');
  } else {
    res.status(400).json('Invalid user data!');
    throw new Error('Invalid user data');
  };
}

export const logout = (req, res) => {
  res.cookie('jwt', '')
    .status(200)
    .json(' logout successfully');
}