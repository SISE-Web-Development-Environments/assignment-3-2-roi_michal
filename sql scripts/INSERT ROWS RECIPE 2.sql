INSERT INTO dbo.recipes
(
	[author],
	[recipe_name],
	[image_url],
	[prep_time],
	[vegan],
	[vegeterian],
	[gluten_free],
	[servings],
	[aggregateLikes],
	[instructions]
	
  
)
VALUES(
    'michal',
	'fried egg',
	'http://www.pngmart.com/files/5/Eggs-PNG-Image.png',
	10,
	0,
	1,
	0,
	1,
	3,
	'In a small nonstick over medium heat, melt butter (or heat oil). Crack egg into pan. Cook 3 minutes, or until white is set. Flip and cook 2 to 3 minutes more, until yolk is slightly set. Remove from pan and season with salt and pepper.'
)
GO