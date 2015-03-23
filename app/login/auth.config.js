angular
  .module('exquisite')
  .config(authConfig)
  .run(privateRoutes);

function authConfig($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'AuthCtrl',
      controllerAs: 'auth',
      resolve: {
        data: function ($location, authFactory) {
          if (authFactory.isLoggedIn()) {
            $location.path('/canvas');
          }
        }
      }
    })
    .when('/logout', {
      template: '',
      controller: 'LogoutCtrl'
    });
}

function privateRoutes($location, authFactory, $rootScope) {
   $rootScope.$on('$routeChangeStart', function (event, nextRoute) {

    $rootScope.user = authFactory.getAuth();

    if (loginRequired()) {
      $location.path('/login');
    }

    function loginRequired() {
      return nextRoute.$$route && nextRoute.$$route.private && !authFactory.isLoggedIn();
    }
  });
}
