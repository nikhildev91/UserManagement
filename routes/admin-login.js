var express = require('express');
var router = express.Router();

var adminHelper = require ('../helpers/userData-Helpers')

/* GET users listing. */


router.get('/', function(req, res, next) {

    

    if (req.session.adminLoggedIn){

        
        res.redirect('/admin')
    }else{

        let errorMessage = req.session.errorMessage

    req.session.errorMessage = null

  res.render('admin/admin-login', {errorMessage});

    }

    
});

router.post('/', (req, res, next)=>{
    var AdminLoginData = req.body;

    adminHelper.findAdmin(AdminLoginData).then((response)=>{
        if(response.status){

            req.session.admin=response.admin

            

            req.session.adminLoggedIn = true

            
            
            res.redirect('/admin')
        }else{

            req.session.errorMessage="Log In Failed"
            res.redirect('/admin-login')
        }
    })

});


router.get('/logout', (req, res, next)=>{

    console.log("checking test : "+req.session.adminLoggedIn);
    
    req.session.destroy()


    

    //  req.session.user = null;
    // req.session.addm = false;

    console.log("req  nokkk swesssion  "+req.session);

    // console.log("adminLoggedIN false ayo ille"+req.session.adminLoggedIn);

    res.redirect('/admin-login')
})

module.exports = router;