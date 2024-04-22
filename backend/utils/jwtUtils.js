import jwt from 'jsonwebtoken';
/**@param {import('express').Response} res  */
const generateToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

    res.cookie('jwt',token,
    {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60*60*24*30 *1000
    })
}


/**@param {import('express').Response} res  */
const releaseToken = (res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
      })
} 

export  { generateToken, releaseToken};