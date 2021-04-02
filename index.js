import express from 'express'
let app = express();
let port = process.env.port || 3000;
let router = express.Router();
app.use("/", router);

app.listen(port, () => {
	console.log(`Node.js application running on port : ${port}`);
});

router.get("/anUrl", (req, res) => {
	res.send("ok");
});

router.get("/test", (req, res) => {
	res.send("{status:200, message:'ok'}");
});

var d = new Date();
var h = d.getHours();
var s = d.getSeconds();
router.get("/time", (req, res) => {
	res.send(`{status:200, message:${h}:${s}}`);
});

