INSERT INTO dbo.users
(
    [username], [password]
)
VALUES(
    'aa', HASHBYTES('SHA2_256','aaa')
)
GO