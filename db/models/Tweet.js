const mongoose = require("mongoose");

const Search = mongoose.Schema({
  searchTerm: {
    type: Stirng,
    trim: "true",
    required: [true, "Search term is required"],
    validate: {
      validator: function(v) {
        /* There must be a string value and trimmed should be truthy */
        return v && typeof v == "string" && v.trim();
      },
      message: props => {
        console.log("props of validator is", props);
        return `Search term is a required field`;
      }
    }
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
