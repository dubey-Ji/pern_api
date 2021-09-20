const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const db = require("./queries");

const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);

app.get("/users/:id", db.getUserById);

app.post("/createuser", db.createUser);

app.put("/updateuser/:id", db.updateUser);

app.delete("/deleteuser/:id", db.delUser);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
