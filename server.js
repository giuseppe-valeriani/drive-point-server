require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const server = express();
const pupilsRoutes = require("./routes/pupilsRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");

server.use(
  cors({
    origin: "http://localhost:3000",
  })
);
server.use(express.json());
server.use("/", pupilsRoutes);
server.use("/", paymentsRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1cwdouo.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server running on port ${PORT}, Database linked.`)
    )
  )
  .catch((error) => console.log(error));
