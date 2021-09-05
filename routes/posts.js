const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);
    res.send("Success");
});
// router.post('/post',(req,res) => {
//     con
// })
module.exports = router;