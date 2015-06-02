angular
  .module('exquisite')
  .config(authConfig)
  .run(privateStates);

function authConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'AuthCtrl as auth',
      private: false,
      resolve: {
        data: function ($location, authFactory) {
          if (authFactory.isLoggedIn()) {
            $location.path('/');
          }
        }
      }
    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });
};

function privateStates($location, authFactory, $rootScope, $state) {
   $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    if (loginRequired()) {
      $location.path('/login');
      $state.go('login', {}, {reload: true});
    }

    function loginRequired() {
      return toState.private && !authFactory.isLoggedIn();
    }
  });
}
