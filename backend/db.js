const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";
//  Now use 127.0.0.1 instead of localhost

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Successfully connected to Mongo"))

    .catch((err) => {
      console.error(err);
    });
};
module.exports = connectToMongo;

// export default db

// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
