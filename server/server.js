const path = require('path');
const express = require('express');

const app = express();

const submissionRouter = require('./routes/submission');
const userRouter = require('./routes/user');
const fileRouter = require('./routes/file');
const commentRouter = require('./routes/comment');

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */

// Serve uploads, and set content-type to pdf.
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads'),
  {
    setHeaders: (res, path, stat) => {
      console.log("Setting header on:", path);
      res.setHeader('Content-Type', 'application/pdf');
    }
  }));

app.use('/', express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */
app.use('/api/submission', submissionRouter);
app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);
app.use('/api/comment', commentRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
