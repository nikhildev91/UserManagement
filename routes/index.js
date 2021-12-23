var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.render('index');
  }else{
    res.redirect('/user-login')
  }
  
});

module.exports = router;
