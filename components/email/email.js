angular.module('teletomo').component('email', {
  templateUrl: 'components/email/email.html',
  controller: function ($http, $scope, $rootScope) {
    $scope.invertTheme = $rootScope.theme == 'dark' ? 'light' : 'dark';
    loadEmails();
    // bootstrap modal from bootstrap cdn
    let modal = new bootstrap.Modal('#add-email-modal');
    $scope.addEmailForm = {
      recipients: []
    }

    $scope.addEmail = function () {
      const request = $scope.addEmailForm;
      const email = {
        sender: 'User@teletomo.com',
        recipients: request.recipients,
        subject: request.subject,
        dateTime: new Date().toISOString().replace('Z', ''),
        message: request.message,
      }

      createEmail(email);
      modal.hide();
    }

    $scope.removeEmail = function (id) {
      deleteEmail(id);
    }

    $scope.addRecipient = function($event) {
      if ($scope.addEmailForm.q && $event.code == 'Enter') {
        let recipient = $scope.addEmailForm.q.trim().toLowerCase();
        if (!$scope.addEmailForm.recipients.includes(recipient)) {
          $scope.addEmailForm.recipients.push(recipient);
        }
        $scope.addEmailForm.q = '';
      }
    }

    $scope.removeRecipient = function(eid) {
      const index = $scope.addEmailForm.recipients.indexOf(eid);
      $scope.addEmailForm.recipients.splice(index, 1);
    }



    function createEmail(Email) {
      $http.post("http://localhost:8080/email", Email).then(
        (res) => { $scope.emails = res.data.emails },
        (err) => { console.error(err) }
      )
    }

    function deleteEmail(id) {
      $http.delete(`http://localhost:8080/email/${id}`).then(
        (res) => { if (res.data.data) loadEmails() },
        (err) => { console.error(err); }
      )
    }

    function loadEmails() {
      $http.get("http://localhost:8080/email",).then(
        (res) => { $scope.emails = res.data.emails; console.log($scope.emails); },
        (err) => { console.error(err) }
      );
    }
  }
});
