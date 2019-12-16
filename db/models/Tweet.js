const mongoose = require("mongoose");

const Search = mongoose.Schema({
  searchTerm: {
    type: "string",
    trim: "true",
    required: ture
  },
  results: [Object]
});
