import "dotenv"
import express from 'express';
import { prismaClient } from 'db/client';


const app = express();

app.use(express.json());


app.get('/users',async(req,res)=>{
    const data = await prismaClient.user.findMany({});
    if(!data){
        return res.status(403).json({
            message:"Couldn't get any data"
        })
    }
    res.status(200).json({
        data,
        message:"Successfull"
    });

})

app.get('/user',async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            success:false,
            error:"Username or password not entered!!"
        })
    }
    try {
        const user = await prismaClient.user.findFirst({
        where:{
            username:username,
            password:password
        }
      })
        if(!user){
            return res.status(402).json({
            success:false,
            message:"User not found!!"
             })
        }
      else{
            res.status(200).json({
            success:true,
             user
             })
          }
    } catch (error:any) {
        console.log(error.message)
        return res.status(503).json({
            success:false,
            message:error.message
        })
    }
})

app.post('/user',async(req,res)=>{
    const {username,password} = req.body;
    try {
        
        const userexists = await prismaClient.user.findFirst({
            where:{
                username:username,
                password:password
            }
        })
        if(userexists){
            return res.status(402).json({
                success:false,
                message:"User already exists!"
            })
        }
        const user =  await prismaClient.user.create({
            data:{
                username:username,
                password:password
            }
        })
        return res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        
    }
    
    
    
})
console.log(typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD)
console.log("DATABASE_URL:", process.env.DATABASE_URL)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})