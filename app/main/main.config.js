angular
  .module('exquisite')
  .config(exquisiteConfig);

function exquisiteConfig($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main/main.html',
      controller: 'MainCtrl'
    })
    .when('/canvas', {
      templateUrl: 'canvas/canvas.html',
      controller: 'CanvasCtrl',
      controllerAs: 'canvas',
      private: true
    })
    .when('/users/:username', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile',
      private: true
    })
    .otherwise({
      redirectTo: '/'
    });
}
