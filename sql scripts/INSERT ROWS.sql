INSERT INTO dbo.users
(
    [username], [password], [first_name], [last_name], [country], [email]
)
VALUES(
    'michal', HASHBYTES('SHA2_256','aaa'), 'Michal', 'Talmor', 'Israel', 'talmormi@post.bgu.ac.il'
)
GO