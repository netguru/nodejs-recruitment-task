import 'express-async-errors';

import config from './config/default';
import app from './app/app';

const { PORT } = config;

app.init();

app.listen(PORT, () => {
  console.log(`Movies service running at port ${PORT}`);
});
