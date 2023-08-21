// import User from "models/user";
// import { getServerSession } from "next-auth";
// import { connectDB } from "utils/mongoose";
// import { authOptions } from "../auth/[...nextauth]";
// connectDB();
// export default async function handler(req, res) {
//   const { method } = req;
//   const { messages, email } = req.body;
//   const session = await getServerSession(req, res, authOptions );
  
//   switch (method) {
//     case "GET":
//       try {
//         if(!session) return res.status(401).json({message: "Unauthorized"});
//         const {chats} = await User.findOne({ email: req.query.email }).select("chats");
//         return res.status(200).json(chats);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//       }

//     case "POST":
//       try {
 
//         // const user = await User.findOneAndUpdate({email: session.user.email}, {$push: {chats: req.body}}, {new: true})
//         const datos = {
//           role: messages.role,
//           content: messages.content,
//         };
//         const user = await User.findOneAndUpdate(
//           { email: email },
//           { $push: { chats: datos } },
//           { new: true }
//         );

//         return res.status(200).json(user);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//       }
//     case "DELETE":
//       try {
//         const user = await User.findOneAndUpdate(
//           { email: req.query.email },
//           { chats: [] },
//           { new: true }
//         );
//         const chat = user.chats;
//         return res.status(200).json(chat);
//       } catch (error) {
//         console.log(error);
//       }
//   }
// }
