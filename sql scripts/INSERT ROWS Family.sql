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
	'76660db7-43cd-4949-ab08-188983e2bbd4',
    'Vedi Talmor',
	'pasta with oil & garlic',
	'1 cup oil, 1 pasta pack, 6 garlic, salt, papper',
	'http://www.pngmart.com/files/5/Linguine-PNG-Image.png',
	'Shavuot holiday',
	20,
	1,
	1,
	0,
	6,
	3,
	'Heat oil over medium high heat. Add garlic and cook until golden - be careful not to burn it.  
	Toss with pasta and cooking water per Base Directions. Toss through parsley and chilli flakes, serve with parmesan.'
)
GO