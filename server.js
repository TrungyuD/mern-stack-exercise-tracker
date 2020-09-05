const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'build', 'index.html'));
});
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
});
const {connection} = mongoose;
connection.once('open', () => {
    console.log(`MongoDB database connection established successfully`);
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})