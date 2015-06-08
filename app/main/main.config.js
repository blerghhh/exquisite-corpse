angular
  .module('exquisite')
  .config(exquisiteConfig);

function exquisiteConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      abstract: true,
      url: '',
      templateUrl: 'main/main.html',
    })
    .state('main.welcome', {
      url: '/',
      templateUrl: 'main/main.welcome.html',
    })
    .state('main.new', {
      url: '/canvas/new',
      templateUrl: 'canvas/canvas.new.html',
      controller: 'CanvasCtrl as canvas',
      private: true
    })
    .state('main.browse', {
      url: '/browse',
      templateUrl: 'browse/browse.html',
      controller: 'BrowseCtrl as browse',
      private: true
    })
    .state('main.canvas/:uuid', {
      abstract: true,
      url: '/canvas/:uuid',
      templateUrl: 'canvas/canvas.html',
      controller: 'CanvasCtrl as canvas'
    })
    .state('main.canvas/:uuid.story', {
      url: '',
      templateUrl: 'canvas/canvas.story.html',
      controller: 'CanvasCtrl as canvas',
      private: true
    })
    .state('main.profile', {
      url: '/profile',
      templateUrl: 'profile/profile.controls.html',
      controller: 'ProfileCtrl as profile',
      private: true
    })
    .state('main.profile/:username', {
      url: '/profile/:username',
      templateUrl: 'profile/profile.browse.html',
      controller: 'ProfileCtrl as profile',
      private: true
    });

}
