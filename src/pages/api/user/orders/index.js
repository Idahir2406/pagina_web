import User from "models/user";
import { connectDB } from "utils/mongoose";
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]";
connectDB();
export default async function handler(req, res) {
  const { method } = req;
  const { email } = req.query;

  switch (method) {
    case "GET":
      try {
        // const session = await getServerSession(req, res, authOptions );
        // console.log(session);
        // if(!session) return res.status(401).json({message: "Unauthorized"});
        const orders = await User.findOne({ email: email }).select(
          "orders"
        );
        return res.status(200).json(orders);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const session = await getServerSession(req, res, authOptions );
        if(!session) return res.status(401).json({message: "Unauthorized"});
        const { order } = req.body;
        if (!order)
          return res.status(400).json({ error: "No se pudo realizar el pago" });
        const user = await User.findOneAndUpdate(
          { email: session.user.email },
          { $push: { orders: req.body } },
          { new: true }
        ).select("orders");
        if (user.orders.length === 0)
          return res.status(404).json({ error: "No se pudo realizar el pago" });
        return res
          .status(200)
          .json(
            "Pago recibido con exito, gracias por su compra, su pedido llegara en 3 dias habiles"
          );
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    case "PUT":

    case "DELETE":
  }
}
