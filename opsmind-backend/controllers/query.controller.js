const embedService = require("../services/embed.service");
const { searchSimilarChunks } = require("../services/search.service");
const { buildSystemPrompt } = require("../services/prompt.service");

module.exports = async function queryController(req, res) {
    try {
        const {
            question,
            topK = 3,
            minScore = 0.6
        } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        // 1. Generate embedding for the question
        const queryEmbedding = await embedService.embedText(question);

        // 2. Perform vector similarity search
        const results = await searchSimilarChunks(queryEmbedding, topK);

        // 3. Filter by score and remove duplicates
        const seenTexts = new Set();
        const cleanedMatches = [];

        for (const r of results) {
            if (r.score < minScore) continue;
            if (seenTexts.has(r.chunk.text)) continue;

            seenTexts.add(r.chunk.text);

            cleanedMatches.push({
                score: Number(r.score.toFixed(3)),
                text: r.chunk.text,
                documentId: r.chunk.documentId,
            });
        }

        // 4. Take top 3 chunks for prompt construction (Week-2 requirement)
        const topChunksForPrompt = cleanedMatches.slice(0, 3);

        // 5. Build LangChain system prompt (NO LLM call yet)
        const systemPrompt = await buildSystemPrompt(
            question,
            topChunksForPrompt
        );


        // 4. Final response
        res.json({
            question,
            totalMatches: cleanedMatches.length,
            matches: cleanedMatches,

            // Week-2 output (before final generation)
            systemPrompt,
            contextUsed: topChunksForPrompt
        });


    } catch (err) {
        console.error("QUERY ERROR:", err);
        res.status(500).json({ error: "Query failed" });
    }
};
