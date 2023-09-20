const db = require('./db');

const userModel = {}

userModel.insertNewUser = async (user) => {
    console.log("To insert: ", user);
    const queryString = `
        INSERT INTO users (user_name, user_pwd) VALUES ($1, $2)
        RETURNING user_id`;
    params = [user.user_name, user.user_pwd];

    const result = await db.query(queryString, params);
    user.user_id = result.rows[0].user_id;
}

// Get a single user's name by the Id. Return null if not found.
userModel.getUserNameById = async (userId) => {
    const queryString =
        `SELECT user_name FROM users WHERE users.user_id = $1`;
    const params = [userId];
    const results = await db.query(queryString, params);
    if (results.rows.length === 0) {
        return null;
    } else {
        return results.rows[0].user_name;
    }
}

// Get multiple users' names by their Ids. Accept an array of user Ids, and
// return an object where keys are user Ids and values are user nanms.
// If some user Ids are not found, that user Id key will be missing in the returned object.
userModel.getUserNameByIds = async (userIds) => {
    console.log("Get user Ids: ", userIds);
    const queryString =
        `SELECT user_id, user_name FROM users WHERE users.user_id = ANY ($1)`;
    const params = [userIds];
    const results = await db.query(queryString, params);

    const idToName = {};
    for (let i = 0; i < results.rows.length; ++i) {
        idToName[results.rows[i].user_id] = results.rows[i].user_name;
    }
    return idToName;
}

module.exports = userModel;