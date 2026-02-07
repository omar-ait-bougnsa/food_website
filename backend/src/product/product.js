import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export function getproducts(req,res)
{

}

export async function postProduct(req,res)
{
    const products = req.body;
    if (!products.name || !products.description || !products.price || !products.category || !products.image || !products.availability)
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
        image : products.image,
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