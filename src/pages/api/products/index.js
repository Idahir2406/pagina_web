import {connectDB} from "utils/mongoose";
import Product from "models/product";

connectDB();
export default async (req, res) => {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const products=await Product.find();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    
    case "POST":
      try {
        const newProduct=new Product(body)
        const saveProduct=await newProduct.save()
        return res.status(201).json(saveProduct);
      } catch (error) {
        return res.status(500).json({ error: error.message });      
      }  
    
    default:
      return res.status(400).json({ error: "Method not allowed" });
  }
};
