const dotenv = require("dotenv");
dotenv.config();

export default process.env.PRO
  ? "https://neuronbica-admin.herokuapp.com"
  : "http://localhost:5000";
