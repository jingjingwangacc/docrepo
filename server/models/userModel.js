const db = require('./db');

const userModel = {}

// Create a new in-memory object respresening a user. Each key corresponds to a
// column in the users table. Such object can be used to insert new users to the
// database.
//
// Note: The returned user object is not yet written to database, and does not
// have a valid userId. Caller shall then set the necessary information in the
// object, and call insertNewUser().
//
// Also, calling get...() methods to fetch user(s) from database will also
// return such object(s).
userModel.newUserObject = () => {
    return {
        userId: -1,
        userName: "",
        userPwd: "",
    }
}

userModel.insertNewUser = async (user) => {
    console.log("To insert: ", user);
    const queryString = `
        INSERT INTO users (user_name, user_pwd) VALUES ($1, $2)
        RETURNING user_id AS "userId"`;
    params = [user.userName, user.userPwd];

    const result = await db.query(queryString, params);
    console.log(result.rows);
    user.userId = result.rows[0].id;
}

// Get a single user's name by the Id. Return null if not found.
userModel.getUserNameById = async (userId) => {
    const queryString =
        `SELECT user_name AS "userName" FROM users WHERE users.user_id = $1`;
    const params = [userId];
    const results = await db.query(queryString, params);
    if (results.rows.length === 0) {
        return null;
    } else {
        return results.rows[0].userName;
    }
}

// Get multiple users' names by their Ids. Accept an array of user Ids, and
// return an object where keys are user Ids and values are user nanms.
// If some user Ids are not found, that user Id key will be missing in the returned object.
userModel.getUserNameByIds = async (userIds) => {
    console.log("Get user Ids: ", userIds);
    const queryString =
        `SELECT
            user_id AS "userId",
            user_name AS "userName"
        FROM users
        WHERE users.user_id = ANY ($1)`;
    const params = [userIds];
    const results = await db.query(queryString, params);

    const idToName = {};
    for (let i = 0; i < results.rows.length; ++i) {
        idToName[results.rows[i].userId] = results.rows[i].userName;
    }
    return idToName;
}

module.exports = userModel;
