import { PrismaClient } from "@prisma/client";
import path from "path";
import multer from "multer";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination : (req,file,cb) =>
    {
        cb(null, 'image/');
    },
    filename : (req,file,cb) =>
    {
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename);
    }
})
export const upload = multer({ storage: storage });
export function getproducts(req,res)
{

}

export async function postProduct(req,res)
{
    const products = req.body;
    console.log("products = ",products)
    if (!products.name || !products.description || !products.price || !products.category ||!products.availability)
        return res.status(401).json({message : "inavlid productes"})
    console.log(products)
    try
    {
        const product = await prisma.Product.create({
        data : {
        name : products.name,
        description: products.description,
        price : parseInt(products.price),
        category : products.category,
        image : req.file.filename,
        availability : true,
        },
        });
         return res.status(201).json({message : "successful upload", product});
    }
    catch(error)
    {
        return res.status(500).json ({message: "error in server"}) 
    }
}