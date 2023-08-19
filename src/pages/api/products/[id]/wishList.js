import { connectDB } from "utils/mongoose";
import Product from "models/product";
import User from "models/user";
import { verify } from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  const token = req.cookies.MyToken;
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "POST":
      try {
        const producto = await Product.findById(id);
        if (!producto)
          return res.status(404).json({ error: "Product not found" });
        const usuario = verify(token, "secret");
        const datos = {
          product: producto.id,
        };
        const usuarioupt = await User.findOneAndUpdate(
          { _id: usuario.id },
          {
            $push: {
              wishList: datos,
            },
          },
          { new: true }
        );
        return res.status(200).json(usuarioupt);
      } catch (error) {
        return res.status(500).json({
          error: error.message,
          message: "Error al agregar al carrito",
        });
      }

    case "DELETE":
      try {
        const usuario = verify(token, "secret");
        const usuarioupt = await User.findOneAndUpdate(
          { _id: usuario.id },
          { $pull: { wishList: { product: id } } }
        );
        return res.status(200).json(usuarioupt);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }
}
