const app = require("./app");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
