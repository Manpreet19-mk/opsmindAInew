const embedService = require("../services/embed.service");
const { searchSimilarChunks } = require("../services/search.service");

async function queryController(req, res) {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        const queryEmbedding = await embedService.embedText(question);
        const results = await searchSimilarChunks(queryEmbedding, 3);

        const response = results.map((r) => ({
            score: r.score,
            text: r.chunk.text,
            documentId: r.chunk.documentId,
        }));

        res.json({
            question,
            matches: response,
        });
    } catch (err) {
        console.error("QUERY ERROR:", err);
        res.status(500).json({ error: "Query failed" });
    }
}

module.exports = queryController;
