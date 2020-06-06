const recipe_api_url = "https://api.spoonacular.com/recipes";
const axios = require("axios");
const api_key = "909c9716727d4a91b1e89519e823733b";

function extractQueriesParams(query_params, search_params){
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]){
            search_params[param] = query_params[param];
        }
    });
    console.log(search_params);
}

async function searchForRecipes(search_params){    
    const search_response = await axios.get(`${api_domain}/search`, 
        {
            params: search_params,
        }
    );
    const recipes_id_list = extrasSearchResultIds(search_response);
    console.log(recipes_id_list);
    //Get recipe info by ID
    let info_array = await getRecipesInfo(recipes_id_list);
    console.log("info_array: ", info_array);
    return info_array;
}

function extrasSearchResultIds(search_response){
    let recipes = search_response.data.results;
    recipes_id_list = [];
    recipes.map((recipe) => {
        console.log(recipe.title);
        recipes_id_list.push(recipe.id);
    });

    return recipes_id_list;
}

async function getRecipesInfo(recipes_id_list){
    let promises = [];
    //for each id -> get promise of GET response
    recipes_id_list.map((id) =>
    promises.push(axios.get(`${recipe_api_url}/${id}/information?${api_key}`))
    );
    let info_response1 = await Promise.all(promises);
    relevantRecipesData = extractRelevantRecipeData(info_response1);
    return relevantRecipesData;
}

function extractRelevantRecipeData(recipes_info){
    return recipes_info.map((recipe_info) => {
        const{
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegan,
            glutenFree,
            image,
        } = recipe_info.data;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,

        };
    });
}



exports.searchForRecipes = searchForRecipes;
exports.extrasSearchResultIds = extrasSearchResultIds;
exports.extractQueriesParams = extractQueriesParams;
exports.extractRelevantRecipeData = extractRelevantRecipeData;
exports.getRecipesInfo = getRecipesInfo;