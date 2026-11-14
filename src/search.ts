import { createVectorStore } from "./db.js";

const search = async () => {
  const vectorStore = await createVectorStore();

  try {
    const query =
      "Miért csökken a légnyomás, ahogy egyre magasabbra emelkedünk?";
    const results = await vectorStore.similaritySearchWithScore(query, 3);

    results.forEach(([doc, score], index) => {
      console.log(`\n--- Találat ${index + 1} ---`);
      console.log("Score:", score);
      console.log("PDF oldal:", doc.metadata.loc?.pageNumber);
      console.log("Szöveg:", doc.pageContent);
    });
  } finally {
    await vectorStore.end();
  }
};

await search();
