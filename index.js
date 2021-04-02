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

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

router.get('/movies/create', function(req, res) {
    res.send(`create`)
});

router.get('/movies/read', function(req, res) {
    const obj = movies
   res.send(`{status:200, data:${JSON.stringify(obj)}}`);
});

router.get('/movies/udpate', function(req, res) {
    res.send(`udpate`)
});

router.get('/movies/delete', function(req, res) {
    res.send(`delete`)
});