var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const bcrypt = require("bcrypt");

router.post("/Register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    const users = await DButils.selectUsernames();

    if (users.find((x) => x.username === req.body.username)) {
      throw { status: 409, message: "Username taken" };
    }
    // make new password
    let hash_password = bcrypt.hashSync(req.body.password, parseInt(process.env.bcrypt_saltRounds));
    await DButils.insertUserToUser(req.body.username, hash_password, req.body.first_name, req.body.last_name, req.body.country, req.body.email);

    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    // const users = await DButils.execQuery("SELECT username FROM users");
    const users = await DButils.selectUsernames();
    if (!users.find((x) => x.username === req.body.username)) {
      throw { status: 401, message: `No Username: '${req.body.username}' in the system` };
    }
    // check that the password is correct
    const user = (await DButils.selectUserWithUsername(req.body.username))[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 400, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
