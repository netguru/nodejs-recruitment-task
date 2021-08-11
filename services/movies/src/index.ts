import 'express-async-errors';

import app from './app/app';

const { PORT } = process.env;

app.init();

app.listen(PORT, () => {
  console.log(`Movies service running at port ${PORT}`);
});
