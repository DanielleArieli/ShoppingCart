// src/server.ts
import express from 'express';

const app = express();
const port = 3000;

// Import routes
import indexRouter from './routes/index';

// Use routes
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
