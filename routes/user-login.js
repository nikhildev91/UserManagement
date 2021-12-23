var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/userData-Helpers')

/* GET users listing. */

router.get('/logout', (req, res)=>{
    req.session.destroy()

    // console.log("userLogin req. session"+req.session);
    // req.session.user = null;
    // req.session.isLoggedIn = false;
    res.redirect('/user-login')
    
})



router.get('/', function(req, res, next) {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{

        let successMessage = req.session.successMessage

        req.session.successMessage =null

  res.render('users/user-login', {successMessage});

    }
});


// console.log("is Enable"+userHelper.isEnable);

router.post('/',(req, res, next)=>{
    // login data comes here

    // console.log(req.body);

    var userDataLogin = req.body

    console.log("is Enable"+userHelper.enableUser);

    userHelper.findUser(userDataLogin).then((response)=>{
        if(response.status){
            req.session.user=response.user
            req.session.loggedIn=true
            res.redirect('/')
        }
        else {
            res.redirect('/user-login')
        }
    })

   

    


})

module.exports = router;