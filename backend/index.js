const express = require("express");
const cors = require("cors");

require('dotenv').config()

const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listening on port:3000...");
})