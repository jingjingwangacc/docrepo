const fileController = {};

fileController.handleUpload = async (req, res, next) => {
    console.log("Handle upload: ", req.body);
    console.log("Handle upload: ", req.file);
    res.locals.fileId = 1;
    next();
};

module.exports = fileController;
