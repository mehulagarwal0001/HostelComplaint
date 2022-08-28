const jwt=require('jsonwebtoken');

const fetchStudent=(req,res,next)=>{
    //Get the user from the jwt token and id to req object
    const token = req.header('authToken');
    if (!token) {
      return   res.status(401).send({ error: "Please authenticate with valid email" });
    }
    try {
        const data = jwt.verify(token, "This is Secret");
        req.user = data.user.id;
        req.role=data.user.role;
        req.name=data.user.name;
        next();
    } catch (error) {
      return   res.status(401).send({ error: "Please authenticate with a valid id" });
    }
}


module.exports=fetchStudent;