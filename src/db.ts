import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

// Ugyanaz a modell, mint az embedding.ts-ben: 1536 dimenziós vektorokat ad.
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// Kapcsolódás a Neon Postgres-hez, és a vektortár létrehozása.
// Az initialize() első futáskor magától létrehozza a pgvector bővítményt
// és a táblát; később a meglévőt használja.
export async function createVectorStore() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Hiányzik a DATABASE_URL a .env fájlból.");
  }

  return PGVectorStore.initialize(embeddings, {
    postgresConnectionOptions: { connectionString },
    tableName: "flight_chunks",
    columns: {
      idColumnName: "id",
      vectorColumnName: "embedding",
      contentColumnName: "content",
      metadataColumnName: "metadata",
    },
    distanceStrategy: "cosine",
    dimensions: 1536,
  });
}
