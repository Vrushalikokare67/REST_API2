const mongoose = require('mongoose');
function connectDB() {
    // Database connection 🥳
    mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true})

  //  console.log(process.env.MONGO_CONNECTION_URL);
    //mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).on('error', function (err) {
        console.log(err);
      });
}



// mIAY0a6u1ByJsWWZ

module.exports = connectDB;




