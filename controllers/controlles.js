import fs from 'fs'
import path from 'path'
import sha256 from 'sha256'
import Jwt from 'jsonwebtoken'
const secretkey = 'secret'


const GET = (req, res) => {

    let users = fs.readFileSync(path.join(process.cwd(), 'users.json'), 'utf-8')
    users = JSON.parse(users) || []
    res.send(users)

}

const LOGIN = (req, res) => {
    try {
        let { username, password } = req.body
        let users = fs.readFileSync(path.join(process.cwd(), 'users.json'), 'utf-8')
        users = JSON.parse(users) || []
        let user = users.find(person => person.username == username && person.password == sha256(password))
        let agent = req.headers['user-agent']
        let ip = req.ip

        if (user) {
            res.status(200).send({
                status: 200,
                massage: "ok",
                token: Jwt.sign({ userId: user.userId, agent: agent, ip: ip }, secretkey),
                body: user

            })
        }

        throw new Error('follbidn acsess')

    } catch (error) {
        res.status(401).send({
            status: 401,
            message: error.message,
            token: null
        })
    }
}

const REGISTER = (req,res) =>{
    try {
            let {username,password} = req.body
        
            if(!username || username.length > 30){
                throw new Error('usernema invalid')
            }
            if(!password || password.length < 7){
                throw new Error('password invalid')
            }
        
            let users = fs.readFileSync(path.join(process.cwd(),'users.json'),'utf-8')
            users = JSON.parse(users) || []
          
            let newUser ={
                userId: users.length ? users.at(-1).userId +1 : 1,
                username,
                password:sha256(password),
              
          
            }
            users.push(newUser)
          fs.writeFileSync(path.join(process.cwd(),'users.json'),JSON.stringify(users,null,4))
          let ip = req.ip
          let agent = req.headers['user-agent']
          
          res.status(201).send({
              status:201,
              message:'you are registered',
              token:Jwt.sign({userId:newUser.userId, agent: agent ,ip: ip},secretkey)
          })
         } catch (error) {
             res.status(401).send({
                 status:401,
                 message:error.message,
                 token:null
             })
         }
}


export default {
    GET,
    LOGIN,
    REGISTER
}