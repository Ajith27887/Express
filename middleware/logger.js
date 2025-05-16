import express from "express";
const app = express();

//Creating middleware
const logger = (req,res,next) => {
	console.log(`${req.method} ${req.portocol}://${req.get('host')}${req.originalUrl}`);
	next();
}

export default logger;