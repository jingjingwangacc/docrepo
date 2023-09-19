const express = require('express');

const submissionController = require('../controllers/submissionController.js');

const router = express.Router();

router.post('/',
  submissionController.createSubmission,
  (req, res) => res.status(200).json(res.locals.submission)
);

router.get('/:submissionId',
  submissionController.getSubmission,
  (req, res) => res.status(200).json(res.locals.submission)
);

module.exports = router;
