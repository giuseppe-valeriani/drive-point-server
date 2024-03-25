const router = require("express").Router();
const Pupil = require("../models/Pupil");
module.exports = router;

router.put("/:id/notes", async (req, res) => {
  try {
    const pupil = await Pupil.findById(req.params.id);
    pupil.notes = req.body.notes;
    await pupil.save();
    res.status(200).json(pupil.notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
