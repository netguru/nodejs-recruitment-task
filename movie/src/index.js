require('dotenv').config();
const app = require('./server');

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`movie svc running at port ${PORT}`);
});