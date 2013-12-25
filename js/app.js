var RawApp = angular.module('RawApp', ['ui.router', 'ngSanitize'])
.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})
.factory('recipesService', function ($http, $log) {
    
    var recipes = [];

    $http({ method: 'GET', url: 'data/recipes.json' }).
        success(function (data, status, headers, config) {
            recipes = data;
        }).
        error(function (data, status, headers, config) {
            $log.warn(data, status, headers, config);
        });

    return {
        getRecipe: function (name) {
            return _.find(recipes, function(recipe) {
                return recipe.name === name;
            }) 
        },
        getRecipes: function () {
            return recipes;
        }
    };
}).config(function($stateProvider) {
    $stateProvider.state('schedule', {
        url: "/schedule",
        templateUrl: 'partials/schedule.html',
            controllerProvider: function() {
                return 'ScheduleCtrl';
        }      
    }).state('recipe', {
        url: "/recipe/:recipe",
        templateUrl: 'partials/recipe.html',
            controllerProvider: function() {
                return 'RecipeCtrl';
        }      
    }).state('recipes', {
        url: "/recipes",
        templateUrl: 'partials/recipes.html',
            controllerProvider: function() {
                return 'RecipesCtrl';
        }      
    })
}).directive('rlink', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element[0].innerHTML = attrs.rlink;
            element.bind('click', function() {
                scope.$apply(scope.loadRecipe(attrs));
            });
        }
    };
});
