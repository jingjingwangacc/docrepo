const db = require('./db');

const userModel = {}

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
    const queryString =
        `SELECT user_id, user_name FROM users WHERE users.user_id IN $1`;
    const params = [userIds];
    const results = await db.query(queryString, params);

    const idToName = {};
    for (let i = 0; i < results.length; ++i) {
        idToName[results[i].user_id] = results[i].user_name;
    }
    return idToName;
}

module.exports = userModel;