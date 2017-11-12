var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var methodOverride = require("method-override");
var Blog = require("./models/blog.js");
var Comment = require("./models/comment.js");
var User = require("./models/user.js");
var seedDB = require("./seeds");

var commentRoutes = require("./routes/comments.js");
var blogRoutes = require("./routes/blogs.js");
var indexRoutes = require("./routes/index.js");

mongoose.connect("mongodb://vaidotas75:online@ds157185.mlab.com:57185/commonblog");
// seedDB();
// mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://vai01:online@ds237445.mlab.com:37445/commonBlogs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Forests have lots of trees",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(blogRoutes);
app.use(commentRoutes);

app.get('*', function(req, res){
   res.send("Such page doesn't exist.") 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has been started."); 
});