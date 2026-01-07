const fs = require("fs");
const pdfParse = require("pdf-parse");

(async () => {
    try {
        const path = require("path");
        const pdfPath = path.join(__dirname, "test.pdf");
        const buffer = fs.readFileSync(pdfPath);

        const result = await pdfParse(buffer);
        console.log("PDF TEXT LENGTH:", result.text.length);
        console.log("SAMPLE TEXT:", result.text.slice(0, 200));
    } catch (err) {
        console.error("PDF DEBUG ERROR >>>", err);
    }
})();
