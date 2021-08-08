import 'express-async-errors';
import app from './app/app';

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Movies service running at port ${PORT}`);
});
