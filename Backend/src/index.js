import app from "./app.js";
import { conectDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

conectDB();

const port = process.env.PORT || 3000;

app.listen(port);

console.log("server on port", port);
