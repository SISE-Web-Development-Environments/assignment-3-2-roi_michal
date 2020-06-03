//---libraries importing
const express = require("express");
const morgan = require("morgan"); 
const bodyParser = require("body-parser");
const session = require("client-sessions");

// ---route importing
const auth = require("./routes/auth")
const users = require("./routes/users")
const recipes = recipes("./route/recipes")

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
        
    })
)

