require("dotenv").config();
const sql = require("mssql");

const config = {
    user: process.env.tedious_userName,
    password: process.env.tedious_password,
    server: process.env.tedious_server,
    database: process.env.tedious_database,
    connectionTimeout: 1500000,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
    .connect()
    .then(() => console.log("new connection pool Created"))
    .catch((err) => console.log(err));

execQuery = async function (query) {
    await poolConnect;
    try {
        var result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {        
        throw err;
    }
};

// process.on("SIGINT", function () {
//     if (pool) {
//         pool.close(() => console.log("connection pool closed"));
//     }
// });

// ************* QUERIES ************* //

selectUsernames = async function(){
    const users = await execQuery("SELECT username FROM users");
    return users;
};

selectUserWithUsername = async function(username){
    const user = await execQuery(`SELECT * FROM users WHERE username = '${username}'`);
    return user;
};

selectUsersIDs = async function(){
    const usersIDs = await execQuery("SELECT user_id FROM users");
    return usersIDs;
};

insertUserToUser = async function(username, hash_password, first_name, last_name, country, email){
    await execQuery(
        `INSERT INTO users VALUES (
              default,
            '${username}',
            '${hash_password}',
            '${first_name}',
            '${last_name}',
            '${country}',
            '${email}')`
      );    
};

addFavoriteRecipe = async function (user_id, reccipe_id) {
    await execQuery(
        `INSERT INTO favorite_recipes VALUES (          
          '${user_id}',
          '${reccipe_id}')`          
    );
};

getFavoriteRecipes = async function (user_id) {
    const recipes_ids = await execQuery(
        `SELECT recipe_id FROM favorite_recipes WHERE user_id = '${user_id}'`        
    );
    return recipes_ids;
};

// ************* EXPORTS ************* //

module.exports ={
    execQuery: execQuery,
    selectUsernames: selectUsernames,
    selectUsersIDs: selectUsersIDs,
    selectUserWithUsername: selectUserWithUsername,
    insertUserToUser: insertUserToUser,
    addFavoriteRecipe: addFavoriteRecipe,
    getFavoriteRecipes: getFavoriteRecipes
}