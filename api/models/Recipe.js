const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Recipe
let Recipe = new Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  ingredients: {
    type: [String]
  },
  howto: {
    type: String
  },
  url: {
    type: String
  },
  author: {
    type: String
  }
},{
    collection: 'recipe'
});

module.exports = mongoose.model('Recipe', Recipe);
