const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/notes-login", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then((db) => console.log("DB conectado"))
  .catch((err) => console.error(err));
