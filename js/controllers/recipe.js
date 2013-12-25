RawApp.controller('RecipeCtrl', function RecipeCtrl($scope, $stateParams, $rootScope, recipesService) {

	var ROUTE_PATH = '#/recipe/';

	$scope.recipes = function() {
		$rootScope.$emit('LOAD_RECIPES');
	}

	$scope.parse = function(recipe) {

		_.each(recipe.ingredients, function(ingredient, item) {
			recipe.ingredients[item] = $scope.linkify(ingredient);
		})

		recipe.directions = $scope.linkify(recipe.directions);

		return recipe;
	}

	$scope.linkify = function(str) {

		var exp = /\[Recipe:([^\]]+)\]/g;

		var res = str.match(exp);

		_.each(res, function(result) {
			var val = result.substring(8, result.length - 1);
			var ele = '<a href=\"' + ROUTE_PATH + val + '\">' + val + '</a>';
			str = str.replace(result, ele);
		})

		return str;
	}

	$scope.init = function() {
		if ($stateParams.recipe) {
			var recipe = recipesService.getRecipe($stateParams.recipe);
			
			$scope.recipe = recipe ? $scope.parse(recipe) : { 
				phase: $stateParams.recipe,
				name: 'Oops, I can\t find this recipe.',
				servings: 'Looks like you\'re on your own with this one.'
			};
		}
	};

	$scope.init();

});