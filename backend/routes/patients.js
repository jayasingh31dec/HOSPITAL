const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const auth = require("../middleware/auth");  // JWT middleware
const role = require("../middleware/role");  // Role-based access

// @route   GET /api/patients
// @desc    Get all patients
router.get("/", auth, async (req, res) => {
  try {
    const patients = await Patient.find().populate("createdBy", "name email");
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/patients
// @desc    Add a new patient
router.post("/", auth, role(["admin","staff"]), async (req, res) => {
  const { name, age, gender, origin, diagnosis, profileImage } = req.body;
  try {
    const newPatient = new Patient({
      name,
      age,
      gender,
      origin,
      diagnosis,
      profileImage,
      createdBy: req.user.id
    });
    const patient = await newPatient.save();
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/patients/:id
// @desc    Update patient info
router.put("/:id", auth, role(["admin","staff"]), async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/patients/:id
// @desc    Delete patient (admin only)
router.delete("/:id", auth, role(["admin"]), async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ msg: "Patient removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
