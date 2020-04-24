const express = require("express");
const router = express.Router();

const User = require("../models/User");
const passport = require('passport')

// form login
router.get("/user/signin", (req, res) => {
  res.render("users/signin");
});
// verificar login
router.post('/user/signin', passport.authenticate('local',{
  successRedirect: '/notes',
  failureRedirect: '/user/signin',
  failureFlash:true
}))


// form user
router.get("/user/signup", (req, res) => {
  res.render("users/signup");
});

//add user
router.post("/user/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ text: "Por favor llene todos los campos" });
  }
  if (password != confirmPassword) {
    errors.push({ text: "Contraseñas no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "Contraseña debe ser mayor de 4 digitos" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      email,
      name,
      password,
      confirmPassword,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo ya esta en uso");
      res.redirect("/user/signup", {
        email,
        name,
        password,
        confirmPassword,
      });
    } else {
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "A buena hora ya estas registrado");
      res.redirect("/user/signin");
    }
  }
});

//logout
router.get("/user/logout",(req,res)=>{
  req.logOut();
  res.redirect('/');
})

module.exports = router;
