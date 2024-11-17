import express from "express";
import bodyParser from "body-parser";
import e from "express";

const app = express();
const port = 3000;

let posts = [];
let postId = 1;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.post("/create-post", (req, res) => {
    const title = req.body["title"];
    const body = req.body["body"];

    const newPost = { id: postId++, title: title, body: body };
    posts.push(newPost);

    res.redirect("/");
});

app.get("/edit-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit-post.ejs", { post: post });
});

app.post("/edit-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.title = req.body["title"];
    post.body = req.body["body"];

    res.redirect("/");
});

app.post("/delete-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
