import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false, 
    },
    profile: {
      skin_tone: {type: String},
      body_shape: {type: String},
      face_shape: {type: String},
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  {timestamps: true}
);


userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export const User = mongoose.model("User", userSchema);

