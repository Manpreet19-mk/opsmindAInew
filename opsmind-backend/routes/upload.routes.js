// const express = require("express");
// const multer = require("multer");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // INLINE handler (no controller import)
// router.post("/", upload.single("pdf"), async (req, res) => {
//     res.json({ message: "INLINE HANDLER WORKING" });
// });

// module.exports = router;
const express = require("express");
const multer = require("multer");
const handleUpload = require("../controllers/upload.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("pdf"), handleUpload);

module.exports = router;
