RawApp.controller('MainCtrl', function MainCtrl($scope, $state, $rootScope, recipesService) {

	$scope.isSchedule = function() {
		return $state.is('schedule');
	};

	$scope.isRecipe = function() {
		return $state.is('recipe');
	};

	$scope.isRecipes = function() {
		return $state.is('recipes');
	};

	$scope.init = function() {

	    recipesService.getRecipes();

	    var loadRecipe = $rootScope.$on('LOAD_RECIPE', function(event, param){
	        $state.transitionTo('recipe', { recipe: param });
	    });

	    var loadRecipes = $rootScope.$on('LOAD_RECIPES', function(event, param){
	        $state.transitionTo('recipes');
	    });

	    $scope.$on('$destroy', loadRecipe);
	    $scope.$on('$destroy', loadRecipes);

		$state.go('schedule');
	};

	$scope.init();

});