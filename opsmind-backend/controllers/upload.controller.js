const pdfService = require("../services/pdf.service");
const chunkService = require("../services/chunk.service");

module.exports = async function handleUpload(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No PDF uploaded" });
        }

        const text = await pdfService.extractText(req.file.path);
        const chunks = chunkService.chunkText(text);

        res.json({
            message: "PDF parsed and chunked successfully",
            totalChunks: chunks.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
