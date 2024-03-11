const router = require("express").Router();
const Pupils = require("../models/pupilsModel");
module.exports = router;

router.post("/", async (req, res) => {
  try {
    const newPupil = { ...req.body, notes: "" };
    const pupils = await Pupils.create(newPupil);
    return res.status(201).json(pupils);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pupils = await Pupils.find({});
    return res.status(200).json(pupils);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pupil = await Pupils.findById(req.params.id);
    return res.status(200).json(pupil);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const newPupil = await Pupils.findByIdAndUpdate(req.params.id, req.body);
    if (!newPupil) {
      return res
        .status(404)
        .json({ message: `No pupil with ID ${req.params.id} found` });
    }
    const updatedPupil = await Pupils.findById(req.params.id);
    return res.status(201).json(updatedPupil);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pupil = await Pupils.findByIdAndDelete(req.params.id);
    if (!pupil) {
      return res
        .status(404)
        .json({ message: `Cannot find any pupil with ID ${req.params.id}` });
    }
    return res.status(204).json(pupil);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
