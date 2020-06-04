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
        console.error("SQL error", err);
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
    var users = await execQuery("SELECT username FROM users");
    return users;
};

selectUserWithUsername = async function(username){
    var user = await execQuery(`SELECT * FROM users WHERE username = '${username}'`);
    return user;
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

// ************* EXPORTS ************* //

module.exports ={
    execQuery: execQuery,
    selectUsernames: selectUsernames,
    selectUserWithUsername: selectUserWithUsername,
    insertUserToUser: insertUserToUser
}