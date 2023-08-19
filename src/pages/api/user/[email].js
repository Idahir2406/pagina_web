import User from "models/user";

export default async function profileHandler(req, res) {
  const email = req.query.email;
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const usuario = await User.findOne(
          { email: email },
          { password: 0, createdAt: 0, __v: 0, updatedAt: 0,chats:0 } // Proyección para excluir los campos indeseados
        );
        if (!usuario)
          return res.status(404).json({ error: "Usuario no encontrado" });
        return res.status(200).json(usuario);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "PUT":
      try {
        const usuario = await User.findOneAndUpdate(email, req.body, {
          new: true,
          runValidators: true,
        });
        const file = path.join(process.cwd(), "uploads", usuario.image);
        const data = fs.readFileSync(file);
        const imageData = data.toString("base64");
        const imageBase64 = `data:image/jpeg;base64,${imageData}`;

        const usuarioConImagen = {
          ...usuario.toObject(),
          image: imageBase64,
        };

        return res.status(200).json(usuarioConImagen);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }
}
