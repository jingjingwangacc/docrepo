const fileModel = require('../models/fileModel.js');
const fileController = {};

fileController.handleUpload = async (req, res, next) => {
    console.log("Handle upload: ", req.body);
    console.log("Handle upload: ", req.file);
   try {
    // Create a new file object.
    const file = fileModel.newFileObject();

    // Set file information.
    file.fileName = req.file.originalname;
    file.approvedFilePath = '';
    file.submissionState = 'created';
    file.pendingPath = req.file.path;

    // Insert it into the database.
    await fileModel.insertNewFile(file);
    res.locals.file = file;

    return next();
} catch (err) {
    return next({
        log: 'Failed to upload a new file' + err,
        mesaage: { err: 'Failed to upload a new file.' }
    });
}
};

module.exports = fileController;
