const db = require('./db');

const fileModel = {}

// Create a new in-memory object respresening a file. Each key corresponds to a
// column in the files table. Such object can be used to insert new files to the
// database.
//
// Note: The returned file object is not yet written to database, and does not
// have a valid fileId. Caller shall then set the necessary information in the
// object, and call insertNewFile().
//
// Also, calling get...() methods to fetch user(s) from database will also
// return such object(s).
fileModel.newFileObject = () => {
    return {
        fileId: -1,
        fileName: "",
        approvedFilePath: "",
        submissionState: "",
        pendingPath: "",
    }
}

fileModel.insertNewFile = async (file) => {
    console.log("To insert: ", file);
    const queryString = `
        INSERT INTO files (file_name, approved_file_path, submission_state, pending_path) VALUES ($1, $2, $3, $4)
        RETURNING file_id AS "fileId"`;
    params = [file.fileName, file.approvedFilePath, file.submissionState, file.pendingPath];

    const result = await db.query(queryString, params);
    file.fileId = result.rows[0].fileId;
}

// Get pending file path by the Id. Return null if not found.
fileModel.getPendingFilePathById = async (fileIds) => {
    const pengingFilePathList = [];
    for (let i = 0; i < fileIds.length; i++) {
        const queryString =
            `SELECT pending_path AS "pendingPath" FROM files WHERE files.file_id = $1`;
        const params = [fileIds[i]];
        const results = await db.query(queryString, params);
        console.log("To query pending path: ", params[0], "got: ", results.rows);
        if (results.rows.length === 0) {
            return null;
        } else {
            pengingFilePathList.push(results.rows[0].pendingPath);
            console.log('pendingPath: ', pengingFilePathList);
        }
    }
    return pengingFilePathList;
}

module.exports = fileModel;
