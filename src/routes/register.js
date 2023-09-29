import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UsersSchema.js";

const router = express.Router();

// User registration route
router.post("/register", async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });

		if (email) {
			return res.json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new UserModel({
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		res.json({ message: "User Registered Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export { router as registerRouter };
