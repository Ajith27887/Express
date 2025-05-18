import express from "express";
import Blog from "../model/Blog.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


//Get Blog
router.get('/',protect, async (req, res,next) => {
    try {
    	const blogs = await Blog.find( {user : req.user.id} );
		res.status(200).json({ blogs });

	    if (!blogs.length) {
	        return res.status(404).json({ message: 'No blogs found' });
	    }
		
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
})

//Create blog
router.post('/',protect, async (req, res, next) => {
	  if (!req.body.text) {
	    res.status(400)
	    throw new Error('Please add a text field')
	  }

	  const goal = await Goal.create({
	    text: req.body.text,
	    user: req.user.id,
	  })

	  res.status(200).json(goal)

})

// Edit Blog by id
router.put('/:id', async(req, res,next) => {
	const blogId = await Blog.findById(req.params.id);

	if (!blogId) {
		const err = new Error("Id was not found");
		res.status(404);
		next(err)
	}

	const updateblog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new : true})

	res.status(200).json(updateblog);
})


//Delete blog by id
router.delete('/:id',async (req, res) => {
	const blogId = await Blog.findByIdAndDelete(req.params.id);

	if (!blogId) {
		const err = new Error("Id was not found");
		res.status(404);
		next(err)
	}

	res.status(200).json({ id : req.params.id })
})



export default router