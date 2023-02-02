angular.module('teletomo')
  .config(function ($stateProvider) {
    $stateProvider.state({
      name: 'emailDetail',
      url: '/email/{id}',
      component: 'emailDetail',
      resolve: {
        data: function (EmailService, $stateParams) {
          return EmailService.getEmail($stateParams.id);
        }
      }
    });
  })
  .component('emailDetail', {
    bindings: { data: '<' },
    templateUrl: 'components/emailDetail/emailDetail.html',
    controller: function (EmailService, $state) {
      new bootstrap.Tooltip('#trash-tooltip', {placement: 'right'});

      this.remove = function () {
        EmailService.deleteEmail(this.data.id).then(res => {
          if (!res) return;
          new bootstrap.Toast('#deleted').show();
          setTimeout(() => $state.go('email'), 2000);
        });
      }
    },
    controllerAs: 'emailDetail'
  });
