var express = require("express");
var router = express.Router();
var Blog = require("../models/blog.js");
//You don't need to specify index.js because it runs automaticaly.... Because it is named index.js
var middleware = require("../middleware");


router.get('/blogs', function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        }else{
        res.render("blogs/index.ejs", {blogs: allBlogs});
        }
    });
});

router.post('/blogs', middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var content = req.body.content;
   var created_at = req.body.created_at;
   var author = {
        id: req.user._id,
        username: req.user.username
   }
   var newBlog = {name: name, price: price, image: image, content: content, author: author, created_at: created_at};
   Blog.create(newBlog, function(err, newlyBlog){
       if(err){
           console.log(err);
       }else{
           res.redirect('/blogs');
       }
   });
});
router.get('/blogs/new', middleware.isLoggedIn, function(req, res) {
     res.render("blogs/new.ejs");
});

router.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
       if(err){
           console.log(err);
       }else{
           console.log(foundBlog);
           res.render("blogs/show.ejs", {blog: foundBlog});
       }
    });
});

//Edit route
router.get('/blogs/:id/edit', middleware.checkBlogOwnership, function(req, res) {
        Blog.findById(req.params.id, function(err, foundBlog){
            res.render("blogs/edit.ejs", {blog: foundBlog});
        });
});

//Update route
router.put('/blogs/:id', middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

//Destroy
router.delete('/blogs/:id', middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs');
        }
    });
})

module.exports = router;