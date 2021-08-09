import 'express-async-errors';

import app from './app/app';
import config from './config/default';

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Movies service running at port ${PORT}`);
});
