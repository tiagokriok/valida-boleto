const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const AppError = require('./errors/AppError');

const app = express();

app.use(express.json());
app.use(routes);

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

module.exports = app;
