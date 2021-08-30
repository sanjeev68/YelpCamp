const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl =  process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async  () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '61228d13f18ff1375036f275',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolor eveniet sed dolorum fugit commodi aliquam et sequi ullam ipsam, vel quisquam accusantium libero quis distinctio doloribus itaque tempore perspiciatis?',
            price,
            geometry : { 
                type : "Point", 
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/do6emnj06/image/upload/v1629890643/YelpCamp/iwmh0ppyvzvdjr2wwsyv.png',
                    filename: 'YelpCamp/iwmh0ppyvzvdjr2wwsyv'
                  },
                {
                  url: 'https://res.cloudinary.com/do6emnj06/image/upload/v1629890643/YelpCamp/kfs7inpne427x5axjzcn.png',
                  filename: 'YelpCamp/kfs7inpne427x5axjzcn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})