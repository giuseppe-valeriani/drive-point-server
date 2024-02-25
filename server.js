require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const server = express();
const pupilsRoutes = require("./routes/pupilsRoutes");

server.use(cors());
server.use(express.json());
server.use("/", pupilsRoutes);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
