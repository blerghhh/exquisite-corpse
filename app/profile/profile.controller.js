angular
  .module('exquisite')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($routeParams, profileFactory, BASE_URL) {
  var vm  = this,
      fb  = new Firebase(BASE_URL),
      id  = fb.getAuth().uid;

  profileFactory.findOne(id, function (user) {
    vm.user = user;
  });

}
