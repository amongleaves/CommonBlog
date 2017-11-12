var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");

var data = [
    {
        name: "Forest camp",
        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Mountain camp",
        image: "https://images.unsplash.com/photo-1457368406279-ec1ecb478381?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Winter camp",
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed blogs.");
    });
    
    //ADD CAMPGROUNDS
    data.forEach(function(seed){
        Blog.create(seed, function(err, blog){
            if(err){
                console.log(err);
            }else{
                console.log("added a seed");
                //CREATE A COMMENT
                Comment.create({
                    text: "Nice place, except is there internet?",
                    author: "Some dude"
                }, function(err, comment){
                    if(err){
                        console.log(err)
                    }else{
                        blog.comments.push(comment);
                        blog.save();
                        console.log("Created new comment.")
                    }
                });
            }
        });
    });
    
    //ADD COMMENTS
}

module.exports = seedDB;