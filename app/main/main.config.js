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
      url: '/story/new',
      templateUrl: 'story/story.new.html',
      controller: 'StoryCtrl as story',
      private: true
    })
    .state('main.story/:uuid', {
      abstract: true,
      url: '/story/:uuid',
      templateUrl: 'story/story.html',
      controller: 'StoryCtrl as story'
    })
    .state('main.story/:uuid.note', {
      url: '',
      templateUrl: 'story/story.note.html',
      controller: 'StoryCtrl as story',
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
