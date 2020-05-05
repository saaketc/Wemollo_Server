const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const searchRecommendationRoute = require('./routes/searchRecommendationRoute');
const searchBarRoute = require('./routes/searchBarRoute');

const app = express();
const port = process.env.PORT || 5000;
// const dbConnect = process.env.MONGODB_URI || 'mongodb://localhost:27017/orangeteddy';
const dbConnect = 'mongodb+srv://wemollo777:mongodb123@cluster0-hhi8y.mongodb.net/wemollo?retryWrites=true&w=majority';

// Connection to database
const startDb = async () => {
    try {
        await mongoose.connect(dbConnect,
            { useNewUrlParser: true });
        console.log('Connected to db');
    }
    catch (e) {
        console.log(e.message);
    }
}
startDb();
app.use(express.json());
app.get('/', (req, res) => {
      
    res.send('Welcome to Wemollo!')});
app.use(cors());
app.use('/api/searchRecommendation', searchRecommendationRoute);
app.use('/api/searchBar', searchBarRoute);

app.listen(port, () => console.log(`Connected on ${port}...`));



