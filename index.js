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
   res.send(`{status:200, data:${JSON.stringify(movies)}}`);
});

router.get('/movies/udpate', function(req, res) {
    res.send(`udpate`)
});

router.get('/movies/delete', function(req, res) {
    res.send(`delete`)
});

router.get('/movies/read/:v', function(req, res) {
    var v = req.params.v
    if(v == "by-date"){
       const sorted =  movies.sort(function (a, b) {
            var dateA = new Date(a.year), dateB = new Date(b.year)
            return dateA - dateB
        });
        res.send(`{status:200, data:${JSON.stringify(sorted)}}`);
    }
    else if (v == "by-rating"){
        const sorted =  movies.sort(function (a, b) {
            var valA = a.rating, valB = b.rating
            return valA - valB
        });
        res.send(`{status:200, data:${JSON.stringify(sorted)}}`);
    }
    else if (v == "by-title"){
        const sorted =  movies.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        res.send(`{status:200, data:${JSON.stringify(sorted)}}`);
    } 
   
});

router.get('/movies/read/id/:id', function(req, res) {
    var id = req.params.id
    if (id > movies.length-1){
        res.status(404)
        res.send(`{status:404, error:true, message:'the movie ${id} does not exist'}`);
    }
    else{
    res.send(`{status:200, data:${JSON.stringify(movies[id])}}`);
}
 });

router.get('/movies/add', function(req, res) {
    if(req.query.title && req.query.year && isNaN(req.query.year)===false && req.query.year.length===4 && req.query.rating){
     

        let title=req.query.title;
        let year=req.query.year;
        let rating=req.query.rating;
        let movie={title:title,year:year,rating:rating};  

        movies.push(movie);

    
    res.send({status:200, message: movies});

    
    }else if(req.query.title && req.query.year && isNaN (req.query.year) == false && req.query.year.length === 4){

    let rating=4;
    let title=req.query.title;
    let year=req.query.year;
    let movie={title:title,year:year,rating:rating};
    movies.push(movie);
    res.send({status:200, message: movies});


    }else{
        res.status(403)
      res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year '});
    }
});

router.get('/movies/delete/:id', function(req, res) {
    const mvs = movies
    var d = req.params.id
    if (d > mvs.length -1){
        res.status(404)
       res.send( {status:404, error:true, message:'the movie <ID> does not exist'})
    }
    else{
        mvs.splice(d,1);
        res.send(`{status:200, data:${JSON.stringify(mvs)}}`);
    }
    
}); 