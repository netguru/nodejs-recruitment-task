import express, { Request, Response } from 'express';

const PORT = 3001;

const app = express();

app.get('/', (req: Request, res: Response): void => {
  res.json({ status: 200, message: 'Health check - status ok!' });
});

app.listen(PORT, () => {
  console.log(`Movies service running at port ${PORT}`);
});
