RawApp.controller('RecipesCtrl', function RecipesCtrl($scope, $stateParams, $rootScope, recipesService) {

	$scope.load = function (recipe) {
		$rootScope.$emit('LOAD_RECIPE', recipe.name);
	}

	$scope.init = function() {
		$scope.recipes = recipesService.getRecipes();
	};

	$scope.init();

});