import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UsersSchema.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await UserModel.findOne({ username });

	if (!user) {
		return res.status(401).json({ message: "Invalid Credential" });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.status(401).json({ message: "Invalid Credential" });
	}

	const token = jwt.sign({ id: user._id }, "secret");
	res.json({ token, userID: user._id });
});

export { router as loginRouter };
