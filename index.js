const express = require('express');
const userRouter = require('./routes/user');
const { connectMongoDb } = require('./connection');

const PORT = 8001;
const app = express();

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/mvc-node-rest-api');

app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/users', userRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server started on PORT : ${PORT}`);
});
