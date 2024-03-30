import jwt from 'jsonwebtoken'


export const verifyJwtToken = (req,res,next) =>{
    const cookie = req.cookies.refreshToken;
    if(!cookie) return res.send("Bad Authentication")
    const userData = jwt.verify(cookie,process.env.JWT_SECRET)
    if(!userData) return res.send('Error parsing Cookies')
    const id = userData._id;
    req.id = id;
    next()
}