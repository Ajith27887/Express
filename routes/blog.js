import express from "express";
import Blog from "../model/Blog.js";
const router = express.Router();


//Get Blog
router.get('/', async (req, res) => {
    try {
    	const blogs = await Blog.find();
    if (!blogs.length) {
        return res.status(404).json({ message: 'No blogs found' });
    }
    res.status(200).json({ blogs });
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
})

//Create blog
router.post('/', async (req, res, next) => {
    try {

        const blogs = await Blog.create({
            text: req.body.text,
        });
        // Validate request body
		res.status(201).json({ blogs });
		if (!blogs.length) {
            return res.status(400).json({ 
                message: 'Title is required'
            });
        }

    } catch (error) {
        next(error);
    }
})

//Edit Blog by id
router.put('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({msg : `This is our blog id: ${id}`})
})
//Delete blog by id
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({msg : `This is our blog id: ${id}`})
})

export default router