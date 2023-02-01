angular.module('teletomo').service('EmailService', function ($http) {
  var service = {
    getAllEmail: function () {
      return $http.get('http://localhost:8080/email').then(
        (res) => res.data.emails,
        (err) => console.error(err)
      );
    },

    getEmail: function (id) {
      return $http.get(`http://localhost:8080/email/${id}`).then(
        (res) => res.data,
        (err) => console.error(err)
      )
    },

    createEmail: function createEmail(Email) {
      return $http.post("http://localhost:8080/email", Email).then(
        (res) => res.data.emails,
        (err) => console.error(err)
      )
    },

    deleteEmail: function deleteEmail(id) {
      return $http.delete(`http://localhost:8080/email/${id}`).then(
        (res) => res.data.data,
        (err) => console.error(err)
      )
    }
  }

  return service;
})
