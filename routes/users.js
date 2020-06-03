var express = require("express");
var router = express.Router();

//Authentivation all incoming request
router.use((req, res, next)=> {
    if(req.session && req.session.id){
        const id = req.session.id;
        
    }
}

)