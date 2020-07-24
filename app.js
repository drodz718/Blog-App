const bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/ MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
	
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err) {
			console.log("ERROR!");
		}
		else {
			res.render("index", {blogs: blogs});
		}
	});
});

// Blog.create({
// 	title: "Test Blog",
// 	image: "https://images.unsplash.com/photo-1595508064774-5ff825ff0f81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
// 	body: "HELLP THIS IS A BLOG POST"
// });

app.listen(3000, function() {
	console.log("Blog server is running!");
});