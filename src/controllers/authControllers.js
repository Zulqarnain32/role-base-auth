const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

const register = async(req,res) => {
   try{
    const { username,password,role } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username,password:hashedPassword,role})
    await newUser.save();
   res.
     status(201).
     json({message:`user register with username ${username}`})
   } catch(err){
    res.
      status(500).
      json({message:`something went wrong`})
   }
}

const login = async(req,res) => {
  try {
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if(!user){
      return  res.json("user not found")
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.status(400).json({message:"incorrect password"})
    }

    const token = jwt.sign(
        { id:user._id,role:user.role },
        process.env.SECRET_KEY,
        { expiresIn:"1h" }
    )
    res.status(200).json(token)

  } catch(err){
    res.
      status(500).
      json({message:`something went wrong`})
  }


}

module.exports = {register,login}