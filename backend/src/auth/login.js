import { PrismaClient } from "@prisma/client";

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
    console.log("user = ",user)
}