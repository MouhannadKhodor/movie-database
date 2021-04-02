import express from 'express'
let app = express();
let port = process.env.port || 3000;
let router = express.Router();
app.use("/", router);

app.listen(port, () => {
	console.log(`Node.js application running on port : ${port}`);
});

router.get("/anUrl", (req, res) => {
	res.json("ok");
});
