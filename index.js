import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});
app.post("/create-post", (req, res) => {
    const title = req.body["title"];
    const body = req.body["body"];
    res.render("create-post.ejs", {
        title: title,
        body: body
    })
});

app.listen(port, () => {
    console.log(`Server started on  http://localhost:${port}`);
});