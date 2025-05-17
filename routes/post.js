
import express from "express";
const router = express.Router();
const post = [
	{id : 1, name : "ajith"},
	{id : 2, name : "yogesh"},
	{id : 3, name : "kumar"}
]

//Example Syntx: router.get(path, handler) 

//GET Single post 
// BY Using (:id) on url we can take single user.
router.get("/:id", (req, res, next) => {
	const id = parseInt(req.params.id); //we take params id from request
	const foundPost = post.find(data => data.id === id);

	if (!foundPost) {
		const error = new Error("post id is not founded") //Middleware Error handling
		res.status(404)
		return next(error)
	}else{
        res.status(200).json(foundPost);
	}
})

//GET aLL post 

// 1. Im Query we can set limit on url by using (?limit=(num value))
router.get("/", (req, res) => {
	const limit = parseInt(req.query.limit); //we take limit from request
	if (!isNaN(limit)) {
		res.json(post.slice(0,limit))
	}else {
		res.json(post)
	}
})

//Create new post
router.post('/',(req,res) => {
	const newPost = {
		id: post.length + 1,
		name: req.body.name
	}
	post.push(newPost)
	res.status(201).json(post)
})

//Edit post 
router.put("/:id",(req,res) => {
	const id = parseInt(req.params.id); //Taking id from params
	const posts = post.find(data => data.id === id); // Taking excat id post for error handling

	// Error Handling
	if(!posts){
		const error = new Error("post id is not founded") //Middleware Error handling
		res.status(404)
		return next(error)
	}

	posts.name = req.body.name;
	res.status(200).json(post)
})

//Delete post 
router.delete("/:id",(req,res) => {
	const id = parseInt(req.params.id); //Taking id from params
	const postExists = post.find(data => data.id === id); // Taking excat id post for error handling

	// Error Handling
	if(!postExists){
		res.status(404).json({msg : "post not found"});
	}

	//delete post
	post = post.filter(data => data.id !== id)
	res.status(200).json(post)
})
export default router