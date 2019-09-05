const mongoose = require('mongoose'); 
const config = require('config');
const db = config.get('mongoURI')
 
// mongoose.connect('mongodb://localhost:27017/amdb', { useNewUrlParser: true });
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log('Database connected...')
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;