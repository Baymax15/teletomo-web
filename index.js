const app = angular.module('teletomo', ['ui.router']);

app.config(function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  // An array of state definitions
  var states = [
    { name: 'home', url: '/', component: 'home' },
    { name: 'billing', url: '/billing', component: 'billing' },
    { name: 'email', url: '/email', component: 'email' },
    { name: 'inventory', url: '/inventory', component: 'inventory' },
    { name: 'sms', url: '/sms', component: 'sms' },
    { name: 'voicemail', url: '/voicemail', component: 'voicemail' },
  ]

  // Loop over the state definitions and register them
  states.forEach(function (state) {
    $stateProvider.state(state);
  });
});