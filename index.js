const app = angular.module('teletomo', []);
const baseUrl = 'http://localhost:8080/';

app.controller('IndexController', function ($scope, $http) {
  $scope.destinations = {
    selected: "",
    endpoints: [],
  }

  $scope.sendMessage = function () {
    const message = $scope.msg;
    const destination = $scope.destinations.selected;
    if (message && destination) {
      $http.post(baseUrl + destination, {message})
        .then(function successCallback(response) {
          console.log(response);
          $scope.response = response.data.response;
        }, function errorCallback(err) {
          console.log(err);
        });
    }
  }

  $scope.toTitleCase = function(inp) {
    return `${ inp.charAt(0).toUpperCase() }${ inp.substring(1) }`;
  }


  function getDestinations() {
    $http.get(baseUrl).then(function (response) {
      $scope.destinations.endpoints = response.data;
    }, function (error) {
      console.log(error);
    });
  }
  getDestinations();
});