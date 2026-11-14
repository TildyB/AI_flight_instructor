import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const sentences = [
  "A wing generates lift as air flows around it.",
  "Airflow over an aircraft wing produces an upward aerodynamic force.",
  "Aircraft maintenance records must be updated after inspections.",
];

const vectors = await embeddings.embedDocuments(sentences);

console.log("Vektorok száma:", vectors.length);
console.log("Dimenzió:", vectors[0].length);
