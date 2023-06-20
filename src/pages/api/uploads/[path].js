import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { path: filePath } = req.query;
  
  const file = path.join(process.cwd(), 'uploads', filePath);
  
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return res.status(500).send('Error al leer el archivo');
    }
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(data);
  });
}
