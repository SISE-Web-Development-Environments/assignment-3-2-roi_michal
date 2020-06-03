var express = require("express");
var router = express.Router();

//Authentivation all incoming request
router.use((req, res, next) => {
    if (req.session && req.session.id) {
        const id = req.session.id;
        const user = checkIdOnDb(id);

        if (user){
            req.user = user;
            next();
        }
    }
    req.sendStatus(401);
});

router.get("/user/recipeInfo/{ids}", (req, res) => {
    const ids = req.params.ids;
    const user_name = req.user;
    getUserInfoOnRecipes(user_name, ids); 
});

exports.router = router;

