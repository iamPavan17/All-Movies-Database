const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const cors = require('cors');


// For body-parser
app.use(express.json());

// For CORS
app.use(cors())

//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/amdb', { useNewUrlParser: true });

//conecting routes
const MovieRouter = require('./routes/movies');
app.use('/movies', MovieRouter);
const ActorRouter = require('./routes/actors');
app.use('/actors', ActorRouter);

// For invalid URL path
app.use((req, res) => {
    res.status(404).send({
        notice: 'The given URL is not found!!!'
    })
});

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});