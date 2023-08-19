import admin from "firebase-admin";
import firebaseSevise from "utils/firebaseService.json";
import formidable from "formidable";
import User from "models/user";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { uploadProfilePic } from "../../utils/firebase";
import sharp from "sharp";
const adminConfig = {
  credential: admin.credential.cert(firebaseSevise),
  storageBucket: "christmasstore-c5b20.appspot.com",
};
if (!admin.apps.length) {
  admin.initializeApp(adminConfig);
}
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function profileHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: "No autorizado" });
      try {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error("Error al procesar la solicitud:", err);
            return res
              .status(500)
              .json({ error: "Error al procesar la solicitud" });
          }
          
          const profilePicture = files.image;
          // Redimensionar la imagen
          const resizedImage = await sharp(profilePicture.filepath)
            .resize(400, 400)
            .toBuffer(); // Convert to buffer
          const ImageConverted = resizedImage.toString("base64");

          const imageUrl = await uploadProfilePic(ImageConverted);
          // const url = uploadProfilePic(resizedImage);
          await User.findOneAndUpdate({email:session.user.email},{
            image:imageUrl
          })
          return res.status(200).json("Imagen actualizada correctamente");
          // Copiar el archivo al destino
        });
        // const user = await User.findOneAndUpdate({email:session.user.email},{
        //   image:url
        // },{new:true});
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    // case "GET":
    //   try {
    //     const { filename } = req.query;

    //     if (!filename) {
    //       return res
    //         .status(400)
    //         .json({ error: "Nombre de archivo no proporcionado" });
    //     }

    //     const bucket = admin.storage().bucket();
    //     const file = bucket.file(filename);
    //     const [fileBuffer] = await file.download();

    //     res.setHeader(
    //       "Content-Disposition",
    //       `attachment; filename=${filename}`
    //     );
    //     res.setHeader("Content-Type", "application/octet-stream");
    //     res.send(fileBuffer);
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ error: error.message });
    //   }
  }
}
