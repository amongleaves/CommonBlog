var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js")

router.get('/', function(req, res){
   res.render("landing.ejs");
});

router.get('/register', function(req, res) {
   res.render("register.ejs"); 
});

//handel register 
router.post('/register', function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err);
           return res.render("register.ejs");
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       })
   });
});

//show login form
router.get('/login', function(req, res) {
   res.render("login.ejs"); 
});

//handelling login 
router.post('/login', passport.authenticate("local",
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res) {
});

//LOG OUT ROUTE
router.get('/logout', function(req, res) {
   req.logout();
   req.flash("success", "You have been logged out.")
   res.redirect('/campgrounds')
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;