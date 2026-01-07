const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

async function extractText(filePath) {
    // filePath will be something like: uploads/xyz.pdf
    const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.join(process.cwd(), filePath);

    const buffer = fs.readFileSync(absolutePath);
    const result = await pdfParse(buffer);

    return result.text;
}

module.exports = {
    extractText,
};
