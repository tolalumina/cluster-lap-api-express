// app.js
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

//defined instance PORT = 8080
const PORT = 8080;
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/hello", (req, res) => {
  res.send("Running locahost on port :8080");
});
app.listen(PORT, () =>
  console.log(`Server running on port 3000 http://localhost: ${PORT}`),
);
