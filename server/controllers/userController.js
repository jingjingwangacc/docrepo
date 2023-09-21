const userModel = require('../models/userModel.js');

const userController = {};

userController.createUser = async (req, res, next) => {
    console.log("Create user with the following params: ", req.body);
    try {
        // Create a new user object.
        const user = userModel.newUserObject();
        user.userName = req.body.userName;
        user.userPwd = req.body.userPwd;

        // Insert it into the database.
        await userModel.insertNewUser(user);
        res.locals.user = user;

        return next();
    } catch (err) {
        return next({
            log: 'Failed to create new user' + err,
            mesaage: { err: 'Failed to create new user.' }
        });
    }
};

module.exports = userController;
