import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import { bookRouter } from "./routes/books.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/book", bookRouter);

mongoose
	.connect("mongodb+srv://smvidyakallesh:vidyak@vidya.oa0z5kp.mongodb.net/vidya?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => {
		console.error(err);
	});

app.listen(4000, () => console.log("Server running..."));
