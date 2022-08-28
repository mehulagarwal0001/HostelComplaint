const router=require('express').Router();
const User=require('../modals/User');
const jwt=require('jsonwebtoken');


router.post('/signup', async (req,res)=>{
    try{
      const {name,email, password } =req.body;
     var role="student";
      if(req.body.role){
        role=req.body.role
      }
      const existuser= await User.findOne({email});

      if(existuser){
        return res.status(400).json({error:"User Exist"})
      }

      const user=new User({name,email,password,role})
      const saveduser =await user.save();

      const data ={
        user:{
            id:saveduser.id,
            role:saveduser.role,
            name:saveduser.name
        }
      }

      const authToken =jwt.sign(data,"This is Secret");

// return res.json("helol");
      return res.json({authToken:authToken,role:role,name:name});

    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error.message})
    }

})



router.post('/login',async(req,res)=>{
    const {email,password} =req.body;

    const existuser= await User.findOne({email});
    if( !existuser ) return res.status(400).json({error:"Wrong Credentials"});

    if(existuser.password != password)  return res.status(400).json({error:"Wrong Credentials"});

    const data ={
        user:{
            id:existuser.id,
            role:existuser.role,
            name:existuser.name
        }
      }

      const authToken =jwt.sign(data,"This is Secret");


      return res.json({authToken:authToken,role:existuser.role,name:existuser.name});
})


module.exports =router;