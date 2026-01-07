const mongoose = require("mongoose");

const documentChunkSchema = new mongoose.Schema(
    {
        documentId: {
            type: String,
            required: true,
        },
        chunkIndex: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        embedding: {
            type: [Number], // 384-dim vector
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("DocumentChunk", documentChunkSchema);
