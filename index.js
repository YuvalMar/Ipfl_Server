const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./module/Post");
require("dotenv/config");

const userSchema = new mongoose.Schema({});
const Players = mongoose.model("Players", userSchema, "players");
const PlayerStats = mongoose.model("PlayerStats", userSchema, "playerStats");
const Teams = mongoose.model("Teams", userSchema, "Teams");

const app = express();
const getRoute = require("./routes/posts");
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//PORT
const port = process.env.PORT || 3001;
if (process.env.NODE_ENV === "production") {
    console.log("im here");
    app.use(express.static("build"));
    app.get("*", (req, res) => {
        req.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

app.listen(port, () => console.log("listening on " + port));
mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
// Get back all the posts
app.get("/players", async(req, res) => {
    try {
        const posts = await Players.find();
        res.json(posts);
    } catch (err) {
        console.log(" im here");
        console.log(err);
        res.json({ message: err });
    }
});

// app.post("/players", async(req, res) => {
//     const post = new Post(req.body);
//     try {
//         const savedPost = await post.save();
//         res.json(savedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// Specific post

app.get("/players/:postId", async(req, res) => {
    try {
        const post = await Players.find({
            TeamID: `${req.params.postId}`,
        });
        console.log("im here, post is " + post);
        const data = JSON.parse(JSON.stringify(post[0]));
        const playersArray = data.filteredByTeamPlayers;
        res.header("Access-Control-Allow-Origin", "*");
        res.json(playersArray);
    } catch (err) {
        console.log("error");
        res.json({ message: err });
    }
});
app.get("/playerStats/:postId", async(req, res) => {
    try {
        const post = await PlayerStats.find({
            playerId: `${req.params.postId}`,
        });
        const data = JSON.parse(JSON.stringify(post[0]));
        const playersArray = data.statsArray;
        res.header("Access-Control-Allow-Origin", "*");
        res.json(playersArray);
    } catch (err) {
        console.log("error");
        res.json({ message: err });
    }
});

app.get("/teams", async(req, res) => {
    try {
        const posts = await Teams.find();
        res.json(posts);
    } catch (err) {
        console.log(" im here");
        console.log(err);
        res.json({ message: err });
    }
});

app.get("/teams/:teamID", async(req, res) => {
    try {
        const posts = await Teams.find({ teamID: `${req.params.teamID}` });
        res.json(posts);
    } catch (err) {
        console.log(" im here");
        console.log(err);
        res.json({ message: err });
    }
});