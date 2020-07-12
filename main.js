//---libraries importing
require("dotenv").config();
const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("client-sessions");
const DButils = require("./routes/utils/DButils");


//---App settings and config
const app = express();
const port = process.env.PORT || "4000";
const corsConfig = {
    origin: true,
    credentials: true
  };

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//print request logs
app.use(morgan(":method :url :status  :response-time ms"));
//setting cookies configuration
app.use(
    session({
        cookieName: "session", //the cookie key name
        secret: process.env.COOKIE_SECRET,
        duration: 15 * 60 * 1000 * 60,
        activeDuration: 0, //if expireIn < activeDuration,
        //the session will be extended by activeDuration milliseconds
    })

);

// ---route importing
const auth = require("./routes/auth");
const users = require("./routes/users");
const recipes = require("./routes/recipes");

//region cookie middleware
app.use( async (req, res, next) => { try{
    if (req.session && req.session.user_id) {
        const usersIDs = await DButils.selectUsersIDs();
        if (usersIDs.find((x) => x.user_id === req.session.user_id)) {
            req.user_id = req.session.user_id;
        }
        next();
    }
    else {
        next();
    }
} catch (error) {
    next(error);
  }
});


//Rounting
app.use("/auth", auth);
app.use("/users", users);
app.use("/recipes", recipes);


app.get("/alive", (req, res) => {
    res.send("I'm alive");
});

//Defult router
app.use((req, res) => {
    res.send(404);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({ message: err.message, success: false });
});

app.listen(port, () => {
    console.log('Exmple app listening on port ${port}!');
});


