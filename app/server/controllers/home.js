const express = require('express');

const router = express.Router();
const project = require ("../services/project")


router.get('/', (req, res) => {

  // add code to render the Home Component, and pass in the projects 
   const projects = project.getAll()
   const user = req.session.user;

  // as a props
  res.render('Home', {props: projects, us: user})


});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})


module.exports = router;