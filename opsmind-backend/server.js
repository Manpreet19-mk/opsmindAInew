const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: import route
const uploadRoutes = require("./routes/upload.routes");

// DEBUG (this will save you hours)
console.log("uploadRoutes type:", typeof uploadRoutes);

// mount route
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
    res.send("OpsMind Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
