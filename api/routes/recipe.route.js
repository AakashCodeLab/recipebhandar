const express = require('express');
const app = express();
const recipeRoutes = express.Router();

// Require Recipe model in our routes module
let Recipe = require('../models/Recipe');
// Defined store route
recipeRoutes.route('/add').post(function (req, res) {

  let recipe = new Recipe(req.body);
  recipe.save()
    .then(recipe => {
      res.status(200).json({'recipe': 'recipe in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
recipeRoutes.route('/').get(function (req, res) {
    Recipe.find(function (err, recipes){
    if(err){
      console.log(err);
    }
    else {
      res.json(recipes);
    }
  });
});

// Defined edit route
recipeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Recipe.findById(id, function (err, recipe){
      res.json(recipe);
  });
});

//  Defined update route
recipeRoutes.route('/update/:id').put(function (req, res) {
  console.log(req.params.id);
  console.log(req.body);

  Recipe.findById(req.params.id, function(err, recipe) {
    if (!recipe)
      return next(new Error('Could not load Document'));
    else {
        recipe.author = req.body.author;
        recipe.name = req.body.name;
        recipe.recipeDetail = req.body.recipeDetail;
        recipe.ingredients = req.body.ingredients;
        recipe.instructions = req.body.instructions;
        recipe.preptime = req.body.preptime;
        recipe.cooktime = req.body.cooktime;
        recipe.url = req.body.url;
        recipe.save().then(recipe => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
recipeRoutes.route('/delete/:id').get(function (req, res) {
    Recipe.findByIdAndRemove({_id: req.params.id}, function(err, recipe){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = recipeRoutes;
