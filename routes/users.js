var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const bcrypt = require("bcrypt");

router.use((req, res, next) => {
  if (req.user_id) {
    next();
  }
  else {
    throw { status: 401, message: "unauthorized" }
  }
});

router.post("/addFavoriteRecipe", async (req, res, next) => {
  try {
    await DButils.addFavoriteRecipe(req.user_id, '1234'); //todo: change hard code      
    res.send({ sucess: true, message: "recipe added" });
  } catch (error) {
    next(error);
  }
});

//get my favorite recepies
router.get("/getFavoriteRecipes", async (req, res, next) => {
  try {
    const recipes_ids = await DButils.getFavoriteRecipes(req.user_id);
    res.send(recipes_ids);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
