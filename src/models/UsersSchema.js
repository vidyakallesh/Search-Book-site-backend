import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	savedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
});

export const UserModel = mongoose.model("users", UserSchema);
