import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createVectorStore } from "./db.js";

const loader = new PDFLoader("./data/06_phak_ch4_0.pdf", {
  splitPages: true,
});

const documents = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const chunks = await splitter.splitDocuments(documents);

console.log("PDF oldalak:", documents.length);
console.log("Chunkok száma:", chunks.length);

console.log("Első chunk:");
console.log(chunks[0].pageContent);

console.log("Első chunk metadata:");
console.log(chunks[0].metadata);

const vectorStore = await createVectorStore();

try {
  await vectorStore.addDocuments(chunks);
  console.log(`${chunks.length} chunk eltárolva.`);
} finally {
  await vectorStore.end();
}
