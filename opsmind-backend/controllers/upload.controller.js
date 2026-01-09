const pdfService = require("../services/pdf.service");
const chunkService = require("../services/chunk.service");
const embedService = require("../services/embed.service");
const DocumentChunk = require("../models/DocumentChunk");

module.exports = async function uploadController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No PDF uploaded" });
        }

        // 1. Extract text
        const text = await pdfService.extractText(req.file.path);

        // 2. Chunk text
        const chunks = chunkService.chunkText(text);

        // Use filename as documentId
        const documentId = req.file.filename;

        // 3. Embed + store each chunk
        for (let i = 0; i < chunks.length; i++) {
            const embedding = await embedService.embedText(chunks[i]);

            await DocumentChunk.create({
                documentId,
                chunkIndex: i,
                text: chunks[i],
                embedding,
            });
        }

        res.json({
            message: "PDF ingested and stored successfully",
            totalChunks: chunks.length,
        });
    } catch (err) {
        console.error("UPLOAD ERROR:", err);
        res.status(500).json({ error: "Ingestion failed" });
    }
};
