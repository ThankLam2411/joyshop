import jwt from 'jsonwebtoken';
export const generateToken =(user)=>{
    return jwt.sign({
        id: user.id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_phone: user.user_phone,
        user_address: user.user_address,
        isAdmin: user.isAdmin,
    }, 
    process.env.JWT_SECRET || 'somethingsecret', 
    {
        expiresIn: '30d'
    })
    // param 1: object , param 2: json web token secret like key and generate token
    // param 3: sign function

}
// Middleware authentication
export const isAuth=(req, res,next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
      const token = authorization.slice(7,authorization.length)//Bearer XXXXXXX
      jwt.verify(token,process.env.JWT_SECRET || 'somethingsecret',(err,decode)=>{
        if(err){
          res.status(401).send({message:'Invalid Token'});
        }else{
          req.user=decode;
          // return data decode 
          next();
        }
      })
    }
    else{
      res.status(401).send({message:'No Token'});
  
    }
  }
  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };