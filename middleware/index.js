var Blog = require("../models/blog.js");
var Comment = require("../models/comment.js")
//All the middleware should be here.
var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err){
                req.flash("Blog was not found.");
                res.redirect('back');
            }else{
                 if(foundBlog.author.id.equals(req.user._id)){
                    next();
                 }else{
                     req.flash("You don't have permission to do that.")
                    res.redirect("back");
             }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            }else{
                 if(foundComment.author.id.equals(req.user._id)){
                    next();
                 }else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
             }
            }
        });
    }else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first.");
    res.redirect('/login');
};

module.exports = middlewareObj;