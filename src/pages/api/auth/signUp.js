import { connectDB } from "utils/mongoose";
import User from "models/user";

connectDB();
export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const userNick = await User.findOne({ username: body.username });
        if (userNick) return res.status(400).json({ username: "Este nombre de usuario ya está en uso" });
        const userEmail = await User.findOne({ email: body.email });
        if (userEmail) return res.status(400).json({ email: "Este correo ya está en uso en otra cuenta" });
        const newUser = await User.create(body);
        return res.status(201).json(newUser,{message:"User created"});
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case "GET":
      try {
        const users = await User.find({ email: body.email, password: body.password });
        if (!users) return res.status(400).json({ success: false });
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
