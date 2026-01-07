const { pipeline } = require("@xenova/transformers");

// We load the model ONCE (singleton pattern)
let embedder;

async function getEmbedder() {
    if (!embedder) {
        embedder = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }
    return embedder;
}

/**
 * Generate embedding for a single text chunk
 * @param {string} text
 * @returns {number[]} embedding vector
 */
async function embedText(text) {
    const model = await getEmbedder();

    const output = await model(text, {
        pooling: "mean",
        normalize: true,
    });

    // output.data is a Float32Array → convert to normal JS array
    return Array.from(output.data);
}

module.exports = {
    embedText,
};
