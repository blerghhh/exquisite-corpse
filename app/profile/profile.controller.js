angular
  .module('exquisite')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($routeParams, profileFactory) {
  var vm        = this,
      userName  = $routeParams.username;

  profileFactory.findOne(userName, function (profile) {
    vm.profile = profile;
  });

}
