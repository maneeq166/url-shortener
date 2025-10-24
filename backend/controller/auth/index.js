import { User } from "../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(req,res){
    const {username,email,password} = req.body;

    if(!username||!email||!password){
        return res.status(404).json({message:"Required fields are missing"})
    }

    let user = await User.findOne({email});

    if(user){
        return res.status(404).json({message:"User already exists"})
    }

    const hashedPass = await bcrypt.hash(password,10);

    user = await User.create({username,email,password:hashedPass});

    return res.status(200).json({message:"Registered Successfully",username:user.username})
}


async function loginUser(req,res){
    const {email,password}= req.body;

    if(!email||!password){
        return res.status(404).json({message:"Required fields are missing"})
    }

    let user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"User doesnt exist"})
    }

    let hash = await bcrypt.compare(password,user.password);

    if(!hash){
        return res.status(400).json({message:"Wrong password"})
    }

    let token = jwt.sign({id:user._id,email:user.email,username:user.username})
     
    return res.status(200).json({message:"Logged in!",token})
}

async function getUser(req,res) {
    const id = req.userId;

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    return res.status(200).json({message:"Your details",user});
}




export{createUser,loginUser};