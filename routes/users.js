var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const search_util = require("./utils/SearchUtils");

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
    const {recipe_id} = req.query;
    await DButils.addFavoriteRecipe(req.user_id, recipe_id);      
    res.send({ sucess: true, message: "favorite recipe added" });
  } catch (error) {
    next(error);
  }
});

//get my favorite recepies
router.get("/getFavoriteRecipes", async (req, res, next) => {
  try {
    const recipes_id_list = await DButils.getFavoriteRecipes(req.user_id);
    const recipes = await search_util.getRecipesRelevantInfo(recipes_id_list);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});


router.post("/addSeenRecipe", async (req, res, next) => {
  try {
    const {recipe_id} = req.query;
    await DButils.addSeenRecipe(req.user_id, recipe_id);      
    res.send({ sucess: true, message: "seen recipe added" });
  } catch (error) {
    next(error);
  }
});

//get my favorite recepies
router.get("/getLastThreeSeenRecipes", async (req, res, next) => {
  try {
    const recipes_id_list = await DButils.getSeenRecipes(req.user_id);
    const recipes = await search_util.getRecipesRelevantInfo(recipes_id_list);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});

//get my personal recepies
router.get("/getPersonalRecipes", async (req, res, next) => {
  try {
    //const recipes_id_list = await DButils.getPersonalRecipes(req.user_id);
    const recipes_id_list = await DButils.getPersonalRecipes(req.query.recipe_id);
    const recipes = await getPersonalRecipesInfo(recipes_id_list);
    res.send({ data: recipes });
  } catch (error) {
      next(error);
  }
  
});




async function getPersonalRecipesInfo(recipes_id_list) {
  let promises = [];
  //for each id -> get promise of GET response
  recipes_id_list.map((id) =>
      promises.push( DButils.selectRecipeByID(id))
  );
  let info_response1 = await Promise.all(promises);
  relevantRecipesData = extractRelevantRecipeData(info_response1);
  return relevantRecipesData;
}
module.exports = router;
