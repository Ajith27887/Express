import dotenv from 'dotenv';
import express from 'express';
import post from './routes/post.js';
import logger from './middleware/logger.js';
import errorhandler from './middleware/errorhandler.js';
import connectDB from './db.js';
import blogRouter from './routes/blog.js'


connectDB();
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
app.use("/api/blog", blogRouter)

//Catch All Error Middleware
app.use((req,res,next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error)
})

//Errorhandling
app.use(errorhandler)

app.listen(port, () => console.log(`server is started on ${port}`))

