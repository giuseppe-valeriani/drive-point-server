const router = require("express").Router();
const Pupil = require("../models/Pupil");
module.exports = router;

router.post("/:id/payments", async (req, res) => {
  try {
    const newPayment = {
      date: req.body.date,
      amount: req.body.amount,
      isPaid: false,
    };
    const pupil = await Pupil.findById(req.params.id);
    pupil.payments.push(newPayment);
    await pupil.save();
    return res.status(201).json(newPayment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id/payments", async (req, res) => {
  try {
    const pupil = await Pupil.findById(req.params.id);
    res.status(200).json(pupil.payments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id/payments/:payment", async (req, res) => {
  try {
    const pupil = await Pupil.findById(req.params.id);
    const payment = pupil.payments.find(
      (payment) => payment.id === req.params.payment
    );
    payment.isPaid = !payment.isPaid;
    await pupil.save();
    return res.json(payment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id/payments/:payment", async (req, res) => {
  try {
    const pupil = await Pupil.findById(req.params.id);
    const findIndex = pupil.payments.findIndex(
      (el) => el.id === req.params.payment
    );
    pupil.payments.splice(findIndex, 1);
    await pupil.save();
    return res.status(204).json({ message: "Element deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
