// fuction searchForRecipes(){

// }

function extrasSearchResultIds(search_response){
    let recipes = search_respose.data.results;
    recipes_id_list = [];
    recipes.map((recipe) => {
        console.log(recipe.title);
        recipes_id_list.push(recipe.id);
    });

    return recipes_id_list;
}

// exports.searchForRecipes = searchForRecipes;
exports.extrasSearchResultIds = extrasSearchResultIds;
