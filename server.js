const express = require("express");
const cors = require("cors");
const path = require("path");

const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const publicPath = path.join(__dirname, "client", "public");
app.use(express.static(publicPath));

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.sendFile(publicPath);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ msg: "Something went wronq" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
