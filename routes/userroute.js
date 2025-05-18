import express from "express";
const router = express.Router();
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import protect from "../middleware/authMiddleware.js";

//Get Register user
router.post("/", async (req, res, next) => {
	const {name, email, password} = req.body;

	if (!name || !email || !password) {
		const err = new Error("Input filed is important")
		res.status(404);
		next(err)
	}	

	const existuser = await User.findOne({email})
	if (existuser) {
		res.status(404);
		throw new Error("User already exist");
	}

	const Salt = await bcrypt.genSalt(10);
	const hashedpassword = await bcrypt.hash(password, Salt);

	const user = await User.create({
			name,
			email,
			password : hashedpassword
		}
	)

	if (user) {
		res.json({
			_id : user.id,
			name : user.name,
			email : user.email,
			token : generateToken(user._id)
		})	
	}
})

//Get Login user
router.post("/login", async (req, res, next) => {
	const {email, password} = req.body;

	const user = await User.findOne({email})

	if (user && (bcrypt.compare(password, user.password))) {
		res.json({
		_id : user.id,
		name : user.name,
		email : user.email,
		token : generateToken(user._id)

	})
	}else{
		res.status(404);
		throw new Error("User is invalid")
	}
})

//Get Me user
router.get("/me",protect, async (req, res, next) => {
	res.json({msg : "Me user"})
})

const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SCERTE, {
		expiresIn : "30d"
	})
}
export default router