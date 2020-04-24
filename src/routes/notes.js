const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

// ver form add
router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("note/new-note");
});

// add data
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor escriba un titulo" });
  }
  if (!description) {
    errors.push({ text: "Por favor escriba una descripcion" });
  }
  if (errors.length > 0) {
    res.render("note/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Nota agregada correctamente");
    res.redirect("/notes");
  }
});

// ver form edit
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const notes = await Note.findById(req.params.id);
  res.render("note/edit-note", {
    note: {
      _id: notes._id,
      title: notes.title,
      description: notes.description,
    },
  });
});

// update data
router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect("/notes");
});

// delete
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  req.flash("success_msg", "Eliminado correctamente");
  res.redirect("/notes");
});

// get data
router.get("/notes", isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user:req.user.id }).then((documentos) => {
    const contexto = {
      notes: documentos.map((documento) => {
        return {
          title: documento.title,
          description: documento.description,
          _id: documento._id,
        };
      }),
    };
    res.render("note/all-notes", {
      notes: contexto.notes,
      name: req.user.name
    });
  });
});

module.exports = router;
