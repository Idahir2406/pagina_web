import User from "models/user";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function AddressHandler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { email } = req.query;

  const { method } = req;
  if (!session) return res.status(401).json({ msg: "Unauthorized" });
  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ email: email }).select("adresses");
        return res.status(200).json(user.adresses);
      } catch (error) {}
    case "POST":
      try {
        const address = req.body;
        
        if (
          !address ||
          !address.street ||
          !address.state ||
          !address.city ||
          !address.reference
        )
          return res.status(400).json("Los campos son requeridos");
        const user = await User.findOneAndUpdate(
          { email: email },
          { $push: { adresses: address } },
          { new: true }
        ).select("adresses");
        return res.status(200).json(user);
      } catch (error) {
        console.log(error);
      }
    case "DELETE":
      try {
        const { id } = req.query;
        const user = await User.findOneAndUpdate({ email: email }, { $pull: { adresses: { _id: id } } }, { new: true}).select("adresses");
        return res.status(200).json(user);
      } catch (error) {}
  }
}
