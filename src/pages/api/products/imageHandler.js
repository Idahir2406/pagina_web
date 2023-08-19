import formidable from "formidable";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { uploadProductPic } from "utils/firebase";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  switch (req.method) {
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
        
          try {
            const productPicture = files.image;
            // Redimensionar la imagen
            const resizedImage = await sharp(productPicture.filepath)
              .resize(400, 400)
              .toBuffer(); // Convert to buffer
            const ImageConverted = resizedImage.toString("base64");
            const imageUrl = await uploadProductPic(ImageConverted);
            return res.status(200).json(imageUrl);
          } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
          }
        });
        return res.status(200);
        
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }

  }
}