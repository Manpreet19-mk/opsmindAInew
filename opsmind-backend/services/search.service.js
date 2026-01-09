const DocumentChunk = require("../models/DocumentChunk");

// cosine similarity function
function cosineSimilarity(vecA, vecB) {
    let dot = 0.0;
    let normA = 0.0;
    let normB = 0.0;

    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function searchSimilarChunks(queryEmbedding, topK = 3) {
    const chunks = await DocumentChunk.find();

    const scored = chunks.map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, topK);
}

module.exports = { searchSimilarChunks };
