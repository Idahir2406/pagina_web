import { connectDB } from "utils/mongoose";
import Product from "models/product";

connectDB();

export default async (req, res) => {

  const { method, body, query:{id} } = req;
  switch (method) {
    case "GET":
      try {
        const product=await Product.findById(id);
        if(!product) return res.status(404).json({error:"Product not found"})
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    

    case "PUT":
      try {
        const productUp=await Product.findByIdAndUpdate(id,body,{new:true})
        if(!productUp) return res.status(404).json({error:"Product not found"})
        return res.status(200).json(productUp);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      } 
    case "DELETE":
      try {
        const productDel=await Product.findByIdAndDelete(id)
        if(!productDel) return res.status(404).json({error:"Product not found"})
        return res.status(200).json(productDel,{message:"Product deleted"});
      } catch (error) {
        return res.status(500).json({ error: error.message });
      } 
  }
};
