import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// userSchema.methods.matchPassword = async (enteredPassword) => {
//   return bcrypt.compare(enteredPassword, this.password)
// };

// userSchema.pre('save', async (next) => {
//   // 如果没有修改密码，跳过hash
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// })

const User = mongoose.model('User', userSchema, 'users');

export default User;