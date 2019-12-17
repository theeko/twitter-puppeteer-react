const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://admin:aaa333@ds239578.mlab.com:39578/twitter-puppeteer-react",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
