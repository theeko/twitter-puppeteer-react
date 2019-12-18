const mongoose = require("mongoose");

try {
  const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds239578.mlab.com:39578/twitter-puppeteer-react`;
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: false
    })
    .catch(e => console.log(e.message));
} catch (e) {
  console.log(e.message);
}
