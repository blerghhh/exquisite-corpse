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

  vm.updateProfile = function(){
    var profileData = {
      name: vm.user.name,
    };
    fb.child('users/' + id + "/profile").update(profileData);
  };

  vm.sidebarToggle = function() {
    $("#wrapper").toggleClass("toggled");
  };

}
