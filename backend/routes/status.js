const express = require("express");
const router = express.Router();
const StatusUpdate = require("../models/StatusUpdate");
const Patient = require("../models/Patient");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// @route   GET /api/status/:patientId
// @desc    Get all status updates for a patient
router.get("/:patientId", auth, async (req, res) => {
  try {
    const updates = await StatusUpdate.find({ patientId: req.params.patientId })
      .populate("staffId", "name email")
      .sort({ timestamp: 1 }); // oldest first
    res.json(updates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/status/:patientId
// @desc    Add a new status update/comment
router.post("/:patientId", auth, role(["admin", "staff"]), async (req, res) => {
  try {
    const { status, comment } = req.body;

    // Prevent updates if patient is Deceased
    const patient = await Patient.findById(req.params.patientId);
    const lastUpdate = await StatusUpdate.findOne({ patientId: patient._id }).sort({ timestamp: -1 });
    if (lastUpdate && lastUpdate.status === "Deceased") {
      return res.status(400).json({ msg: "Cannot update a deceased patient." });
    }

    const newUpdate = new StatusUpdate({
      patientId: req.params.patientId,
      status,
      comment,
      staffId: req.user.id
    });

    await newUpdate.save();
    res.json(newUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
