const embedService = require("../services/embed.service");

(async () => {
    try {
        const text = "OpsMind AI is an internal knowledge assistant.";
        const embedding = await embedService.embedText(text);

        console.log("Embedding length:", embedding.length);
        console.log("First 5 values:", embedding.slice(0, 5));
    } catch (err) {
        console.error("EMBED ERROR >>>", err);
    }
})();
