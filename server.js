const express = require("express");
const server = express();
const PORT = 8080;

server.use("/", (_req, res) => {
  res.send("active!");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
