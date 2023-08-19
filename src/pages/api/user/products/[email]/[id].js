import { connectDB } from "utils/mongoose";
import Product from "models/product";
import User from "models/user";

connectDB();

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { email, id },
  } = req;

  switch (method) {
    case "POST":
      try {
        const producto = req.body;
        const productoEncontrado = await Product.findById(id);
        if (!productoEncontrado) {
          return res.status(404).json({ error: "Product not found" });
        }
        // si el producto ya esta en el carrito, sumar la cantidad
        const usuarioEncontrado = await User.findOne({ email: email })
          .where("cart._id")
          .equals(producto._id);
        if (usuarioEncontrado) {
          const usuarioupt = await User.findOneAndUpdate(
            { email: email },
            { $inc: { "cart.0.quantity": producto.quantity } },
            { new: true }
          );
          return res
            .status(200)
            .json({ usuarioupt, msg: `Producto sumado al carrito` });
        }
        //si no esta en el carrito, agregarlo
        await User.findOneAndUpdate(
          { email: email },
          {
            $push: {
              cart: producto,
            },
          },
          { new: true }
        );
        return res.status(200).json({ msg: "El producto se ha añadido al carrito" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message,
          message: "Error al agregar al carrito",
        });
      }

    case "PUT":
      try {
        const producto = await Product.findById(id);
        if (!producto)
          return res.status(404).json({ error: "Product not found" });
        const usuarioEncontrado = await User.findOne({ email: email })
          .where("cart._id")
          .equals(producto.id);
        
        if (!usuarioEncontrado)
          return res.status(404).json({ error: "Product not found in cart" });
        await User.findOneAndUpdate(
          { email: email, "cart._id": producto.id },
          { $set: { "cart.$.quantity": body.quantity } },
          { new: true }
        );
        return res
          .status(200)
          .json({ msg: "Cantidad actualizada en el carrito" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message,
          message: "Error al actualizar la cantidad en el carrito",
        });
      }
    case "DELETE":
      try {
        
        const producto = await Product.findById(id);
        
        if (!producto) {
          return res.status(404).json({ error: "Product not found" });
        }
        const user = await User.findOneAndUpdate({ email: email }, {
          $pull: {
            cart: {
              _id: producto.id
            }
          }
        })
        if(!user) return res.status(404).json({ error: "Product not found in cart" });

        return res.status(200).json("Producto eliminado del carrito");
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message,
          message: "Error al eliminar del carrito",
        });
      }
  }
}
