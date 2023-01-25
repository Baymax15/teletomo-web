angular.module('teletomo')
  .component('home', {
    templateUrl: 'components/home/home.html',
    controller: function ($http, $scope) {
      $http.get("http://localhost:8080/").then(
        (res) => { $scope.headline = res.data.headline },
        (err) => console.log(err)
      )
    }
  })
