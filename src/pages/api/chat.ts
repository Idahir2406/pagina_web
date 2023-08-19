import { Configuration, OpenAIApi } from "openai-edge";

import { OpenAIStream, StreamingTextResponse } from "ai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);
export const config = {
  runtime: "edge",
};

export default async function handler(req:Request, res:Response) {
  const method = req.method;

  if (method === "GET") {
  }
  if (method === "POST") {
    const { messages } = await req.json();

    const res = await fetch("http://localhost:3000/api/products");
    const productos = await res.json();
    
    const contextMessage = {
      role: "system",
      content: `Eres un asistente virtual o chatbot de una tienda de venta de productos de navidad, y los que están disponibles son: ${productos.slice(0,10).map(producto => `${producto.name} (${producto.description}) - Precio: ${producto.price} - Categoría: ${producto.category} - Imagen: ${producto.image} - url:http://localhost:3000/products/${producto._id} `).join(', ')}. Solo puedes dar respuestas relacionadas con ese tema y con los productos. Si alguien hace una pregunta fuera del tema de la tienda, da un aviso de que no puedes cambiar el tema. No devuelvas links, ni urls, el resto si. No responderás a preguntas fuera de este contexto`,
    };
    const conversation = [contextMessage, ...messages];

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages:conversation,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  }
}
