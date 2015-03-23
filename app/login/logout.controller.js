angular
  .module('exquisite')
  .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($rootScope, $scope, $location, authFactory) {
  authFactory.logout(function() {
    $rootScope.user = null;
    $location.path('/login');
    $scope.$apply();
  });
}
