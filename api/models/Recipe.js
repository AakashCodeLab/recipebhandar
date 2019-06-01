const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Recipe
let Recipe = new Schema({
  name: {
    type: String
  },
  recipeDetail: {
    type: String
  },
  ingredients: {
    type: [{
      ingredient:String
    }]
  },
  instructions: {
    type: String
  },
  preptime: {
    type: Number
  },
  cooktime: {
    type: Number
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
