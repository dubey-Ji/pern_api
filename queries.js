const Pool = require("pg").Pool;

const dbHost = process.env.DB_HOST;
const dbUserName = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const pool = new Pool({
  user: dbUserName,
  host: dbHost,
  password: dbPassword,
  port: dbPort,
  database: dbName,
});

const getUsers = async (request, response) => {
  try {
    const usersList = await pool.query("select * from users");
    response.status(200).json(usersList.rows);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const user = await pool.query("select * from users where id = $1", [id]);
    response.status(200).json(user.rows);
  } catch (error) {}
};

const createUser = async (request, response) => {
  try {
    const { name, email } = request.body;

    const user = await pool.query(
      "insert into users (name, email) values ($1, $2)",
      [name, email]
    );
    response.status(200).json(user.rows.id);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const { email, name } = request.body;
    await pool.query("update users set email = $1, name = $2 where id = $3", [
      email,
      name,
      id,
    ]);
    response.status(200).json("Msg: User updated successfully");
  } catch (error) {
    console.log(error);
  }
};

const delUser = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    await pool.query("delete from users where id = $1", [id]);
    response.status(200).json("Msg: User deleted successful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, delUser };
