angular
  .module('exquisite')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($routeParams, $firebaseArray, profileFactory, BASE_URL) {
  var vm  = this,
      fb  = new Firebase(BASE_URL),
      id  = fb.getAuth().uid;

  vm.canvases = $firebaseArray(fb.child('/canvas'));
  vm.userId = id;

  profileFactory.findOne(id, function (user) {
    vm.user = user;
  });

}
