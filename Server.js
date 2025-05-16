import dotenv from 'dotenv';
import express from 'express';
import post from './routes/post.js';
import logger from './middleware/logger.js';
import errorhandler from './middleware/errorhandler.js';

dotenv.config();
const port = process.env.PORT

const app = express(); //Initial express to app variable; //Express is a function;


//MiddleWare
app.use(logger)

//Create new post middleware
app.use(express.json()); //This is for body raw
app.use(express.urlencoded({extended : true})); //This is for www-form-urlencoded


//Router
app.use("/api/post", post);

//Errorhandling
app.use(errorhandler)

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

