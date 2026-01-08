const { PromptTemplate } = require("@langchain/core/prompts");


function buildSystemPrompt(userQuestion, chunks) {
    const context = chunks
        .map((c, i) => `(${i + 1}) ${c.text}`)
        .join("\n\n");

    const template = `
You are an internal company knowledge assistant.

Use ONLY the context below to answer the user's question.
If the answer is not present in the context, say:
"I don't know based on the provided documents."

Context:
{context}

User Question:
{question}
`;

    const prompt = new PromptTemplate({
        template,
        inputVariables: ["context", "question"],
    });

    return prompt.format({
        context,
        question: userQuestion,
    });
}

module.exports = { buildSystemPrompt };
