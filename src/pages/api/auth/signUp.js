import { connectDB } from "utils/mongoose";
import User from "models/user";
import { User as normalUser } from "../../../services/constants";
import bcrypt from "bcrypt";
connectDB();
export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {

        if (!body.username || !body.email || !body.password)
          return res.status(400).json({ message: "Missing fields" });
        if (body.password.length < 8)
          return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
        if (body.password !== body.password2)
          return res.status(400).json({ message: "Passwords don't match" });
    
        const userExists = await User.findOne({
          $or: [{ username: body.username }, { email: body.email }],
        }).select("username email");

        if (userExists) {
          if (userExists.username === body.username) {
            return res
              .status(400)
              .json({ username: "Este nombre de usuario ya está en uso" });
          }
          if (userExists.email === body.email) {
            return res
              .status(400)
              .json({ email: "Este correo ya está en uso en otra cuenta" });
          }
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const credentials = {
          username: body.username,
          email: body.email,
          password: hashedPassword,
        };
        await User.create({ ...credentials, role: normalUser });
        return res.status(201).json({ message: "User created" });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case "GET":
      try {
        const users = await User.find({
          email: body.email,
          password: body.password,
        });
        if (!users) return res.status(400).json({ success: false });
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
