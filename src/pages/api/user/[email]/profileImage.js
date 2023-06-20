import formidable from "formidable";
const fs = require("fs");
const path = require("path");
import sharp from "sharp";
import User from "models/user";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function (req,res) {
  const {method} = req;
  const {email} = req.query;

  if(method === "PUT"){
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
          const originalFilename = profilePicture.originalFilename;
          const newImageFilePath = path.join(
            process.cwd(),
            "uploads",
            originalFilename
          );

          // Redimensionar la imagen
          const resizedImage = await sharp(profilePicture.filepath)
            .resize(400, 400)
            .toBuffer();

          // Copiar el archivo al destino
          fs.writeFile(newImageFilePath, resizedImage, async (err) => {
            if (err) {
              console.error("Error al guardar la imagen redimensionada:", err);
              return res.status(500).json({ error: "Error al procesar la solicitud" });
            }
          
            // Actualizar la referencia de la imagen en la base de datos
            User.findOneAndUpdate(
              { email: email },
              { image: originalFilename },
              { new: true },
              (err, updatedUser) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "Error al procesar la solicitud" });
                }
          
                const file = path.join(process.cwd(), "uploads", updatedUser.image);
                const data = fs.readFileSync(file);
                const imageData = data.toString("base64");
                const imageBase64 = `data:image/jpeg;base64,${imageData}`;
          
                const usuarioConImagen = {
                  ...updatedUser.toObject(),
                  image: imageBase64,
                };
          
                return res.status(200).json(usuarioConImagen);
              }
            );
          });
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }
  else{
    return res.status(405).json({error: "Método no permitido"});
  }
}