INSERT INTO dbo.users
(
    [username], [password], [first_name], [last_name], [country], [email]
)
VALUES(
    'kroi', HASHBYTES('SHA2_256','aaa'), 'Roi', 'Katz', 'Israel', 'roikatz@gmail.com'
)
GO