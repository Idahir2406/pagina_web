import { connectDB } from "utils/mongoose";
import Product from "models/product";
import User from "models/user";
import { authOptions } from '../../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
connectDB();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "POST":
      try {
        const session = await getServerSession(req, res, authOptions)
        if(!session) return res.status(401).json({error:"Unauthorized"})
        return res.status(200).json({ msg: "Producto agregado al carrito" });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
  }
};
