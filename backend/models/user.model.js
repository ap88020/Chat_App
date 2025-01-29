import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : [6,"Email must be atleast 6 characters long"],
        maxLength : [50, "Email must not be 50 characters "],
    },
    password : {
        type : String,
        select : false,
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
  
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword; 
      next();
    } catch (err) {
      next(err); 
    }
  });

userSchema.methods.isValidPassword = async function (password) {
  console.log(password,this.password);    
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {email : this.email},
    process.env.JWT_SECREAT,
    {expiresIn:'24hr'}
  ); 
}

const User = mongoose.model('user',userSchema);

export default User;