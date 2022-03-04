console.log(module)
// import express from 'express';
// import routes from  './routes';
// import { dirname } from 'path';
// import errorMiddleware from "./middlewares/error.middleware";
//
//
// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config({ path: dirname( module.paths[1] ) + "/.env" });
// }
//
// export const app = express();
// export const port = process.env.PORT || 4000;
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
//
//
// // dynamically prepends "/api" to your routes.
// app.get('/',  (req, res)=> {
//     res.send('Welcome to movies API');
// })
//
// app.use('/api', routes);
//
// app.use((req, res, next)=>{
//     const error: any = new Error('resource not found');
//     error.status = 404;
//     next(error);
// })
//
// app.use(errorMiddleware);