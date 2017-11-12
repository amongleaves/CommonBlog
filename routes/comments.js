var express = require("express");
var router = express.Router();
var Blog = require("../models/blog.js");
var Comment = require("../models/comment.js")
//You don't need to specify index.js because it runs automaticaly.... Because it is named index.js
var middleware = require("../middleware");

router.get('/blogs/:id/comments/new', middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new.ejs", {blog: foundBlog});
        }
    });
});

router.post('/blogs/:id/comments', middleware.isLoggedIn, function(req, res){
   Blog.findById(req.params.id, function(err, blog) {
       if(err){
           res.redirect('/blogs');
       }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("Something went wrong.");
                   console.log(err);
               }else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   blog.comments.push(comment);
                   blog.save();
                   req.flash("The comment was succesfully added.")
                   res.redirect('/blogs/'+ blog._id);
               }
           });
       }
   });
});

//comments edit route
router.get('/blogs/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            res.redirect("back");
        }else{
               res.render("comments/edit.ejs", {blog_id: req.params.id, comment: comment});
        }
    });
});

//update comment
router.put('/blogs/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

//Delete comment
router.delete('/blogs/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           console.log(err);
       }else{
           req.flash("success", "The comment was deleted.");
           res.redirect('/blogs/' + req.params.id);
       }
   })
});

module.exports = router;