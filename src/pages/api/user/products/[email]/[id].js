import { connectDB } from "utils/mongoose";
import Product from "models/product";
import User from "models/user";

connectDB();

export default async (req, res) => {
  const {
    method,
    body,
    query: { email, id },
  } = req;

  switch (method) {
    case "POST":
      try {
        const datos = {
          product: id,
          quantity: body.quantity,
        };
        const producto = await Product.findById(id);
        if (!producto) {
          return res.status(404).json({ error: "Product not found" });
        }
        const usuarioEncontrado = await User.findOne({email:email})
          .where("cart.product")
          .equals(producto.id);
        if (usuarioEncontrado) {
          const usuarioupt = await User.findOneAndUpdate(
            { email: email },
            { $inc: { "cart.0.quantity": body.quantity } },
            { new: true }
          );
          return res
            .status(200)
            .json({ usuarioupt, msg: `Producto sumado al carrito` });
        }
        
        await User.findOneAndUpdate(
          { email: email },
          {
            $push: {
              cart: datos,
            },
          },
          { new: true }
        );
        return res.status(200).json({ msg: "Producto agregado al carrito" });
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
        const usuarioEncontrado = await User.findOne({email:email})
          .where("cart.product")
          .equals(producto.id);
        if (!usuarioEncontrado)
          return res.status(404).json({ error: "Product not found in cart" });
        await User.findOneAndUpdate(
          { email: email, "cart.product": producto.id },
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
        const usuarioEncontrado = await User.findOne({email:email});
        if (!usuarioEncontrado) {
          return res.status(404).json({ error: "User not found" });
        }
        usuarioEncontrado.cart = usuarioEncontrado.cart.filter(
          (item) => item.product.toString() !== id
        );
        await usuarioEncontrado.save();
        return res.status(200).json("Producto eliminado del carrito");
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message,
          message: "Error al eliminar del carrito",
        });
      }
  }
};
