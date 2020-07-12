const express = require("express");
var router = express.Router();
const DButils = require('./utils/DButils');
const search_util = require('./utils/serchings');


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
    const recipes_id_list = await DButils.getPersonalRecipes(req.user_id);   
    const recipes = await getRecipesInfo(recipes_id_list);
    res.send({ data: recipes });
  } catch (error) {
      next(error);
  }
  
});

//get my family recepies
router.get("/getFamilyRecipes", async (req, res, next) => {
  try {
    const recipes_id_list = await DButils.getFamilyRecipesIds(req.user_id);
   // const recipes_id_list = await DButils.getPersonalRecipes(req.query.recipe_id);
    const recipes = await getFamilyRecipesInfo(recipes_id_list);
    res.send({ data: recipes });
  } catch (error) {
      next(error);
  }
  
});


async function getRecipesInfo(recipes_id_list) {
  let promises = [];
  //for each id -> get promise of GET response
  recipes_id_list.map((id) =>
      promises.push(DButils.selectRecipeByID(id.recipe_id))
  );
  let info_response1 = await Promise.all(promises);
  relevantRecipesData = await extractRelevantRecipeData(info_response1);
  return relevantRecipesData;
  // return promises
}

function extractRelevantRecipeData(recipes_info) {
  return recipes_info.map((recipe_info) => {
      const {
        recipe_id,
        recipe_name,
      	prep_time,
	      vegan,
      	vegeterian,
      	gluten_free,
        aggregateLikes,
        image_url

      } = recipe_info[0];
      return {
        recipe_id: recipe_id,
        recipe_name: recipe_name,
        prep_time: prep_time,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegeterian: vegeterian,
        gluten_free: gluten_free,
        image_url: image_url,

      };
  });
}

async function getFamilyRecipesInfo(recipes_id_list) {
  let promises = [];
  //for each id -> get promise of GET response
  recipes_id_list.map((id) =>
      promises.push(DButils.selectFamilyRecipeByID(id.recipe_id))
  );
  let info_response1 = await Promise.all(promises);
  relevantRecipesData = await extractFamilyRelevantRecipeData(info_response1);
  return relevantRecipesData;
  // return promises
}

function extractFamilyRelevantRecipeData(recipes_info) {
  return recipes_info.map((recipe_info) => {
      const {
        recipe_id,
        recipe_name,
        author,
        component,
        cook_for,
        prep_time,
        instructions,
	      vegan,
      	vegeterian,
      	gluten_free,
        aggregateLikes,
        image_url

      } = recipe_info[0];
      return {
        recipe_id: recipe_id,
        recipe_name: recipe_name,
        author:author,
        component:component,
        cook_for:cook_for,
        prep_time: prep_time,
        instructions:instructions,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegeterian: vegeterian,
        gluten_free: gluten_free,
        image_url: image_url,

      };
  });
}
module.exports = router;
