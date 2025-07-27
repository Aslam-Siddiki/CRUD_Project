const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride = require("method-override");



app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));




let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "Mission to teach 10 million youth of India!"
    },
    {
        id : uuidv4(),
        username : "aslamsiddiki",
        content : "I am learning Web Development from apnaCollege."
    },
    { 
        id : uuidv4(),
        username : "salimsiddiki",
        content : "Live, love , laugh"
    }
]

app.get("/",(req, res) =>{
    res.render("home.ejs");
});

app.get("/posts",(req, res) =>{
    res.render("index.ejs",{posts}); 
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req, res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if(post){
        res.render("show.ejs",{post});
    }
    else{
        res.render("error.ejs");
    } 
});

app.patch("/posts/:id",(req,res) =>{
    let { id } = req.params;
    let newContent = req.body.content.replace(/\r\n|\r|\n/g, " ");
    let post  = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req, res) =>{
    let {id } = req.params;
    let post = posts.find((p) => id === p.id);
    if(post){
        res.render("edit.ejs",{ post });
    }
    else{
        res.send("Post not found");
    }
});

app.delete("/posts/:id",(req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});


app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
});