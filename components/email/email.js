angular.module('teletomo').component('email', {
  templateUrl: 'components/email/email.html',
  controller: function (EmailService, $scope, $rootScope) {
    $scope.invertTheme = $rootScope.theme == 'dark' ? 'light' : 'dark';

    $scope.addEmail = {
      modal: new bootstrap.Modal('#add-email-modal'),
      data: { recipients: [] }
    } 

    $scope.createEmail = createEmail;
    $scope.removeEmail = removeEmail;
    $scope.addRecipient = addRecipient;
    $scope.removeRecipient = removeRecipient;

    loadEmails();
    function loadEmails() {
      EmailService.getAllEmail().then(emails => {
        $scope.emails = emails;
      });
    }

    function createEmail() {
      const request = $scope.addEmail.data;
      const email = {
        sender: 'User@teletomo.com',
        recipients: request.recipients,
        subject: request.subject,
        dateTime: new Date().toISOString(),
        message: request.message,
      }

      EmailService.createEmail(email).then(emails => {
        $scope.emails = emails;
        $scope.addEmail.data = { recipients: [] }
        $scope.addEmail.modal.hide();
      });
    }

    function removeEmail(id) {
      EmailService.deleteEmail(id).then(isRemoved => {
        if (!isRemoved) return;
        const index = $scope.emails.find(mail => mail.id === id);
        $scope.emails.splice(index, 1);
      });
    }

    function addRecipient($event) {
      if ($scope.addEmail.query && $event.code == 'Enter') {
        let recipient = $scope.addEmail.query.trim().toLowerCase();
        if (!$scope.addEmail.data.recipients.includes(recipient)) {
          $scope.addEmail.data.recipients.push(recipient);
        }
        $scope.addEmail.query = '';
      }
    }

    function removeRecipient(eid) {
      const index = $scope.addEmail.data.recipients.indexOf(eid);
      $scope.addEmail.data.recipients.splice(index, 1);
    }
  }
});
