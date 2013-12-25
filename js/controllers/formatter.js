function FormatterCtrl($scope) {

    $scope.recipes = [];

    $scope.getCategoryName = function (category) {
        switch (category) {
        case 1:
            return "Salads"
        case 2:
            return "Shakes"
        case 3:
            return "Soups"
        case 4:
            return "Dressings"
        case 5:
            return "Rolls, Wraps, Noodles & Patés"
        case 6:
            return "Desserts & Sweet Snacks"
        default:
            return "Unknown"
        }
    }

    $scope.format = function (category) {

        var lines = $scope.recipe.split("\n");

        if (lines.length > 1) {
            $scope.output = angular.toJson({
                name: lines[0],
                category: $scope.getCategoryName(category),
                phase: lines[1],
                servings: lines[2],
                description: lines[3],
                ingredients: lines.slice(4, lines.length - 1),
                directions: lines[lines.length - 1]
            });
        }
    }

    $scope.add = function () {
        $scope.recipes.push(angular.fromJson($scope.output));
        localStorage["recipes"] = angular.toJson($scope.recipes);
        $scope.clear();
    }

    $scope.clear = function () {
        $scope.output = "";
        $scope.recipe = "";
    }

    $scope.restore = function () {
        var recipes = angular.fromJson(localStorage["recipes"]);
        $scope.recipes = recipes ? recipes : [];
    }

    $scope.json = function () {
        var recipes = localStorage["recipes"];
        $scope.output = recipes;
    }

    $scope.clear();
    $scope.restore();

}