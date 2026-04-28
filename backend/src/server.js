const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api/tasks', taskRoutes);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));

module.exports = app;
