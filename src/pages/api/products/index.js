import {connectDB} from "utils/mongoose";
import Product from "models/product";

connectDB();
export default async function handler (req, res)  {
  const { method, body } = req;
  
  switch (method) {
    case "GET":
      try {
        const products=await Product.find();

        return res.status(200).json(products);
        
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
      }
    
    case "POST":
      try {
        if(!body.name || !body.price || !body.description || !body.image) return res.status(400).json("Faltan datos");
        await Product.create(body);
        return res.status(201).json("Producto agregado correctamente");
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });      
      }  
    
    default:
      return res.status(400).json({ error: "Method not allowed" });
  }
};
