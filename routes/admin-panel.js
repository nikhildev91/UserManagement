var express = require('express');
var router = express.Router();
var adminHelper = require('../helpers/userData-Helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.session.adminLoggedIn){
        adminHelper.getAllUsers().then((allUsers)=>{
            res.render('admin/admin-panel',{allUsers})
            
        })
    }else{
        res.redirect('/admin-login')
    }
  
});

router.get('/update-user/:id',(req, res)=>{

    adminHelper.getUserDetails(req.params.id).then((foundUser)=>{
        res.render('admin/edit-user', {foundUser})
    })



});

router.post('/update-user/:id',(req, res)=>{

    adminHelper.updateUserData(req.params.id, req.body).then((updateUser)=>{

        console.log("nikhil update ayo "+updateUser);

        if (updateUser)
        res.redirect('/admin')
    })



});

router.get('/delete-user/:id', (req, res)=>{
    adminHelper.deleteUser(req.params.id).then((del)=>{
        res.redirect('/admin')
    })
});

router.get('/enable-user/:id', (req, res)=>{
    adminHelper.enableUser(req.params.id).then((enable)=>{
        res.redirect('/admin')
    })
});

router.get('/disable-user/:id', (req, res)=>{
    adminHelper.disableUser(req.params.id).then((disable)=>{
        res.redirect('/admin')
    })
});

router.get('/adduser', (req, res)=>{
    res.render('admin/add-user')
});

router.post('/adduser', (req, res)=>{
    let adminAddedUser = req.body
    adminHelper.adduser(adminAddedUser).then((addedUserInsertStatus)=>{

        if(addedUserInsertStatus){
            res.redirect('/admin')
        }else{
            res.redirect('/admin/adduser')
        }



    })
});


module.exports = router;