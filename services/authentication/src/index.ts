import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Authentication service running at port ${PORT}`);
});
