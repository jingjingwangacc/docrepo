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

// Get submissions related to a user.
router.get('/userrelated/:userId',
  submissionController.listSubmissionsByAuthor,
  submissionController.listSubmissionsByReviewer,
  (req, res) => res.status(200).json(
    {
      outgoingSubmissions: res.locals.submissionsByAuthor,
      incomingSubmissions: res.locals.submissionsByReviewer
    })
);

module.exports = router;
