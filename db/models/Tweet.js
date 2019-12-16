const mongoose = require("mongoose");

const Search = mongoose.Schema({
  searchTerm: {
    type: Stirng,
    trim: "true",
    required: ture
  },
  results: [
    {
      username: Stirng,
      userLink: Stirng,
      imgUrls: [String],
      likesCount: Number,
      timestamp: Number,
      message: String,
      avatar: string
    }
  ]
});
