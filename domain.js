export default process.env.NODE_ENV === "production"
  ? "https://neuronbica-admin.herokuapp.com"
  : "http://localhost:5050";
