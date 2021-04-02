import express from 'express'
import url from 'url'
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

router.get('/hello/:id', function(req, res) {
    var id = req.params.id
    res.send(`{status:200, message:"Hello, ${id}"}`)
});

app.get('/search',(req,res) => {
    const search = req.query.s;

    if (typeof search != 'undefined') {
        const response = {
            status:200, message:"ok", data: search
        };

        res.send(response);
    }
    else {
        const response = {
            status:500, error:true, message: "you have to provide a search"
        };


        res.status(500);
        res.send(response);
    }
});

