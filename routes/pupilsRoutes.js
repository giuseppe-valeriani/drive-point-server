const router = require("express").Router();
const Pupil = require("../models/Pupil");
const startingSkills = require("../models/StartingSkills");
module.exports = router;

router.post("/", async (req, res) => {
  try {
    const newPupil = { ...req.body, notes: "", skills: startingSkills };
    const pupils = await Pupil.create(newPupil);
    return res.status(201).json(pupils);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pupils = await Pupil.find({});
    return res.status(200).json(pupils);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pupil = await Pupil.findById(req.params.id);
    return res.status(200).json(pupil);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pupil = await Pupil.findById(req.params.id);
    const foundSkill = pupil.skills.find(
      (skill) => skill.skill === req.body.skill
    );
    const findIndex = pupil.skills.findIndex((el) => el._id === foundSkill._id);
    pupil.skills[findIndex] = req.body;
    pupil.skills[findIndex].label = foundSkill.label;
    await pupil.save();
    return res.json(pupil);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pupil = await Pupil.findByIdAndDelete(req.params.id);
    if (!pupil) {
      return res
        .status(404)
        .json({ message: `Cannot find any pupil with ID ${req.params.id}` });
    }
    return res.status(204).json({ message: "Element deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
