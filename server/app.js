const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path') 


// For body-parser
app.use(express.json());

// For CORS
app.use(cors())

//connecting to mongoDB
// mongoose.connect('mongodb://localhost:27017/amdb', { useNewUrlParser: true });
connectDB();

//conecting routes
const MovieRouter = require('./routes/movies');
app.use('/movies', MovieRouter);
const ActorRouter = require('./routes/actors');
app.use('/actors', ActorRouter);

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

// For invalid URL path
app.use((req, res) => {
    res.status(404).send({
        notice: 'The given URL is not found!!!'
    })
});

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});