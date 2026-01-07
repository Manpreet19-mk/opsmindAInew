const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    res.json({ message: "PURE ROUTER WORKING" });
});

module.exports = router;
