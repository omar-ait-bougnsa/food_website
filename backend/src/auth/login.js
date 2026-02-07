import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export async function handleloging(req,res)
{
    const body = req.body;
    if (!body.username || !body.password)
        return res.status(401).json({message : "invalid username"})
    const username = body.username.trim()
    const password = body.password.trim();

    const user = await prisma.user.findUnique({
        where :{
            username: username
        }
    });
    const ok = await  bcrypt.compare(password,user.password);
    if (!ok)
    {
        return res.status(400).json({message : "invalid password"})
    }
    const token = jwt.sign({userId: user.id, email: user.email}, "qwertyuyiuyuiyerfryegbf", { expiresIn: "1d" })
    res.cookie('token',token, { httpOnly : true, secure : false,maxAge : 24 * 60 * 60 * 1000,sameSite: 'strict' })

   return res.status(201).json({username: user.username,email : user.email,id : user.id})


}