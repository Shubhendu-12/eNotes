const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Enter a title")
      .isLength({ min: 3 }),
    body("description")
      .isLength({ min: 5 })
      .trim()
      .notEmpty()
      .withMessage("Enter valid description"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, description, tag } = req.body;
      // If there are error, Return Bad request and Errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // 1 Find the note to be updated an update it...
    //2 const note = Note.findByIdAndUpdate() => This syntax is not to be used here as it is insecure(It is used below after few security check statements)
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // 3 Here the syntax findByIdAndUpdate() is finally used
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Delete an existing Note using: PUT "/api/notes/]deletenote". Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // 1 Find the note to be deleted an delete it...

    // Below statements are for security checks (To verify a user)
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // 3 Here the syntax findByIdAndDelete is used
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
