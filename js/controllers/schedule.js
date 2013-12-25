RawApp.controller('ScheduleCtrl', function ScheduleCtrl($scope, $rootScope) {

	$scope.loadRecipe = function(attrs) {
		$rootScope.$emit('LOAD_RECIPE', attrs.rlink);
	};

});