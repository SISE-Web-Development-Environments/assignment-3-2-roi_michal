CREATE TABLE [dbo].[recipes](
	[recipe_id] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[author] [varchar] NOT NULL,
	[recipe_name] [varchar](300) NOT NULL,
	[image_url] [varchar](500) NOT NULL,
	[prep_time] [int] NOT NULL,
	[vegan] [int] NOT NULL,
	[vegeterian] [int] NOT NULL,
	[gluten_free] [int] NOT NULL,
	[servings] [int] NOT NULL

)
