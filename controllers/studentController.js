const Student = require("../models/Student");


// ==============================
// ➕ CREATE Student
// ==============================
exports.createStudent = async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      userId: req.user.id, // 🔐 from authMiddleware
    });

    await student.save();
    res.status(201).json(student);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating student" });
  }
};


// ==============================
// 📖 GET All Students (User-specific)
// ==============================
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      userId: req.user.id, // 🔐 only logged-in user's data
    });

    res.json(students);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students" });
  }
};


// ==============================
// 🔍 GET Single Student
// ==============================
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      userId: req.user.id, // 🔐 ownership check
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching student" });
  }
};


// ==============================
// ✏️ UPDATE Student
// ==============================
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id, // 🔐 ownership check
      },
      req.body,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student" });
  }
};


// ==============================
// ❌ DELETE Student
// ==============================
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // 🔐 ownership check
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting student" });
  }
};