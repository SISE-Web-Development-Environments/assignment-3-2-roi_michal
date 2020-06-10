INSERT INTO dbo.family_recipes
(
	[user_id],
	[author],
	[recipe_name],
	[component],
	[image_url],
	[cook_for],
	[prep_time],
	[vegan],
	[vegeterian],
	[gluten_free],
	[servings],
	[aggregateLikes],
	[instructions]
  
)
VALUES(
	'49b9a5f6-3649-43a6-98f0-fdcdc956b193',
    'Liya Katz',
	'Lemon Honey Ginger',
	'1 lemon, 1 spoon of honey, ginger',
	'https://www.theharvestkitchen.com/wp-content/uploads/2019/06/LEMON-WATER-LEMONS-720x720.jpg',
	'Occasionally',
	5,
	1,
	1,
	1,
	1,
	3,
	'Squeze a lemon to a mog until you get about 7mm of lemon.
	Then peel and cut 2 small pieces of ginger.
	Add th honey and pull boild water to the mog and mix'
)
GO