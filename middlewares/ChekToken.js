import  Jwt  from 'jsonwebtoken'
const secretkey = 'secret'

 export default function checkToken(req,res,next){
    try {
     let token = req.headers.token
 
     if(!token){
         throw new Error('tokent undefind')
     }
 
    let {userId,agent,ip} = Jwt.verify(token,secretkey)

       if(ip != req.ip || agent != req.headers['user-agent']){
           throw new Error('this token invalid')
       }
     next()
     
    } catch (error) {
        res.status(403).send({
            status:403,
            message:error.message
        })
    }
 }

 