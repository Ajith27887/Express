require('dotenv').config();
const express = require("express");

const port = process.env.PORT

const app = express(); //Initial express to app variable; //Express is a function;

app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1>")
})

app.get("/about", (req, res) => {
	res.send("About Page")
})

app.get("/contact", (req, res) => {
	res.send("Contact Page")
})

app.listen(port, () => console.log(`server is started on ${port}`))

//GET Single post 
const post = [
	{id : 1, name : "ajith"},
	{id : 2, name : "yogesh"},
	{id : 3, name : "kumar"}
]

app.get("/api/post/:id", (req, res) => {
	const id = parseInt(req.params.id); //we take params id from request
	res.json(post.filter(data => data.id === id))
})

//GET aLL post 
app.get("/api/post/", (req, res) => {
	const limit = parseInt(req.query.limit);
	res.json(post.slice(0,limit))
	
})