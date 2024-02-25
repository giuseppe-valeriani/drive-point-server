const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
module.exports = router;

router.get("/", async (req, res) => {
  try {
    const response = await knex("pupils");
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.code);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.starting_date) {
    return res
      .status(400)
      .json({ message: "Invalid input, please provide required fields" });
  }
  try {
    const newPupil = {
      name: req.body.name,
      starting_date: req.body.starting_date,
    };
    const create = await knex("pupils").insert(newPupil);
    const response = await knex("pupils").where({ id: create[0] }).first();
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error.code);
  }
});

// router.patch("/:id", async (req, res) => {
//   if (!req.params.id || !req.body) {
//     return res.status(400).json({ message: "Invalid request" });
//   }
//   try {
//     const
//     const foundRecord = await knex("pupils").where({ id: req.params.id }).first();
//     const modifiedRecord = {...foundRecord, req.body}
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json(error.code);
//   }
// });
