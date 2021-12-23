var express = require('express');
var router = express.Router();

var userHelper = require('../helpers/userData-Helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log('nikhil '+req.session.loggedIn);

    if(req.session.loggedIn){
        res.redirect('/')
    }else{


        let errMessage = req.session.errMessage
        req.session.errMessage=null

       

        res.render('users/user-signup', {errMessage})

    }

    
  
})
router.post('/', function(req, res){

    // data comes here from the singup form
    // console.log(req.body)

    const userData = req.body

    // console.log('Email onddo '+req.body.Email);

    let checkEmail = req.body.Email

    console.log('Name: '+req.body.Name);
    console.log('Email: '+req.body.Email);
    console.log('Password:'+req.body.Password);

    // checking is email already used
if(req.body.Name=="" && req.body.Email=="" && req.body.Password==""){
    
    console.log("one or all fields are null nso redirect to signup");
}else{

    userHelper.forCheckEmail(checkEmail).then((status)=>{
        console.log("Email ondo illee   "+status);

        var insertStatus = false
        if(userData.Password === userData.ConfirmPassword && status==false){
            userHelper.insertUserData(userData).then((insertStatus)=>{
                if(insertStatus){
                    req.session.successMessage = "SignUp Sucessfully"
                    res.redirect('/user-login')
                }else{
                    // req.session.errMessage= "user SignUp Failed"
                    res.redirect('/user-signup')
                }
            })
        }else{

            if (status==true){
                // console.log("already email is used for singup");

                req.session.errMessage= "Already Email Existed"
                
            res.redirect('/user-signup')
            }else{

                req.session.errMessage= "SignUp Failed"
            res.redirect('/user-signup')

            }
            // req.session.errMessage= "SignUp Failed"
            // res.redirect('/user-signup')
        }
    })



}


    // userHelper.forCheckEmail(checkEmail).then((status)=>{
    //     console.log("Email ondo illee   "+status);

    //     var insertStatus = false
    //     if(userData.Password === userData.ConfirmPassword && status==false){
    //         userHelper.insertUserData(userData).then((insertStatus)=>{
    //             if(insertStatus){
    //                 req.session.successMessage = "SignUp Sucessfully"
    //                 res.redirect('/user-login')
    //             }else{
    //                 // req.session.errMessage= "user SignUp Failed"
    //                 res.redirect('/user-signup')
    //             }
    //         })
    //     }else{

    //         if (status==true){
    //             // console.log("already email is used for singup");

    //             req.session.errMessage= "Already Email Existed"
                
    //         res.redirect('/user-signup')
    //         }else{

    //             req.session.errMessage= "SignUp Failed"
    //         res.redirect('/user-signup')

    //         }
    //         // req.session.errMessage= "SignUp Failed"
    //         // res.redirect('/user-signup')
    //     }
    // })




    // var insertStatus = false
    // if(userData.Password === userData.ConfirmPassword){
    //     userHelper.insertUserData(userData).then((insertStatus)=>{
    //         if(insertStatus){
    //             req.session.successMessage = "SignUp Sucessfully"
    //             res.redirect('/user-login')
    //         }else{
    //             // req.session.errMessage= "user SignUp Failed"
    //             res.redirect('/user-signup')
    //         }
    //     })
    // }else{
    //     req.session.errMessage= "SignUp Failed"
    //     res.redirect('/user-signup')
    // }

})

module.exports = router;