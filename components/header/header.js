angular.module('teletomo').component('header', {
  templateUrl: 'components/header/header.html',
  controller: function ($scope, $rootScope) {
    $scope.setTheme = setTheme;
    
    setTheme();
    function setTheme() {
      console.log($scope)
      $rootScope.theme = $scope.theme;
    }
  }
});