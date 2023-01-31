angular.module('teletomo').component('header', {
  templateUrl: 'components/header/header.html',
  controller: function ($scope, $rootScope, $cookies) {
    $scope.setTheme = setTheme;
    $scope.theme = $cookies.get('theme') || 'light';

    setTheme();
    function setTheme() {
      $cookies.put('theme', $scope.theme);
      $rootScope.theme = $scope.theme;
    }
  }
});