var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");

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

//get my personal recepies
router.get("/getPersonalRecipes", async (req, res, next) => {
  try {
    const recipes_id_list = await DButils.getPersonalRecipes(req.user_id);
    try {
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
      promises.push(axios.get(`${api_domain}/${id}/information`, {
          params: {
              includeNutrition: false,
              apiKey: process.env.spooncular_apiKey
          }
      }))
  );
  let info_response1 = await Promise.all(promises);
  relevantRecipesData = extractRelevantRecipeData(info_response1);
  return relevantRecipesData;
}
module.exports = router;
