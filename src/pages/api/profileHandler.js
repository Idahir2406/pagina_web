import admin from "firebase-admin";
import formidable from "formidable";
import User from "models/user";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { uploadProfileImg,uploadAvatarImg } from "../../utils/firebase";
import sharp from "sharp";

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
          
          const Picture = files.image;
  
          // Redimensionar la imagen

          const Avatar = await sharp(Picture.filepath)
            .resize(125, 125)
            .jpeg({
              quality: 80,
              chromaSubsampling: '4:4:4',
              mozjpeg: true,
            })
            .toBuffer();
          const profileImage = await sharp(Picture.filepath)
            .resize(300, 300)
            .jpeg({
              quality: 80,
              chromaSubsampling: '4:4:4',
              mozjpeg: true,
            })
            .toBuffer();
            // Convert to buffer

          const imageUrl = await uploadProfileImg(profileImage);
          const avatarUrl = await uploadAvatarImg(Avatar);
          // const url = uploadProfilePic(resizedImage);
          await User.findOneAndUpdate({email:session.user.email},{
            image:imageUrl,
            avatar:avatarUrl
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
