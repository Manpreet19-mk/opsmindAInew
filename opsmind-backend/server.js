require("dotenv").config(); // 🔑 MUST be first



const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");



// console.log("connectDB value:", connectDB);
// console.log("connectDB type:", typeof connectDB);



const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 🔑 CONNECT DATABASE BEFORE ROUTES
connectDB();

// routes
const uploadRoutes = require("./routes/upload.routes");
console.log("uploadRoutes type:", typeof uploadRoutes);

app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
    res.send("OpsMind Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
