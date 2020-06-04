//---libraries importing
require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); 
const path = require("path");
const bodyParser = require("body-parser");
const session = require("client-sessions");
//const DButils = require("./routes/utils/DButils");


//---App settings and config
const app = express();
const port = 4000;

//paarse application /x-www-form-urLencoded
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
app.use(bodyParser.json());
//prind request logs
app.use(morgan(":method :url :status  :response-time ms"));
//setting cookies configuration
app.use(
    session({
        cookieName: "session", //the cookie key name
        secret: "sesami1357sec",
        duration:20 * 1000,
        activeDuration: 0, //if expireIn < activeDuration,
        //the session will be extended by activeDuration milliseconds
    })
      
);

// ---route importing
const auth = require("./routes/auth");
const users = require("./routes/users");
const recipes = require("./routes/recipes");

//Rounting
app.use("/auth" , auth);
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


