import User from "models/user";
import Product from "models/product";
export default async function profileHandler(req, res) {
  const email = req.query.email;
  const { method } = req;
  const { productId, quantity } = req.body;
  switch (method) {
    case "GET":
      try {
        const usuario = await User.findOne(
          { email: email },
          {
            password: 0,
            createdAt: 0,
            __v: 0,
            updatedAt: 0,
            wishList: 0,
            image: 0,
            username: 0,
          } // Proyección para excluir los campos indeseados
        );
        return res.status(200).json(usuario);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "PATCH":
      try {
        const producto = await Product.findById(productId);
        if (!producto)
          return res.status(404).json({ error: "Product not found" });
        const usuarioEncontrado = await User.findOne({ email: email })
          .where("cart.product")
          .equals(productId);
        if (!usuarioEncontrado)
          return res.status(404).json({ error: "Product not found in cart" });
        await User.findOneAndUpdate(
          { email: email, "cart.product": productId },
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
  }
}
