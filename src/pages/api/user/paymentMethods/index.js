import crypto from "crypto";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import User from "models/user";
function generateToken() {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
}

export default async function WalletHandler(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  
  switch (method) {
    case "GET":
      break;
    case "POST":
      try {
        const cardInfo = req.body;
        const maskNumbers =
          cardInfo.number.slice(0, 4) +
          "********" +
          cardInfo.number.slice(12, 16);
        const token = generateToken();
        const cardInfoWithToken = { 
          brand: cardInfo.brand,
          type: cardInfo.type,
          name: cardInfo.name,
          token, 
          number:maskNumbers };

        const user = await User.findOneAndUpdate(
          { email: session.user.email },
          { $push: { paymentMethods: cardInfoWithToken }
         },
          { new: true }
        ).select("paymentMethods");

        return res.status(200).json(user);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
  }
}
