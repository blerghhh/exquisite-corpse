angular
  .module('exquisite')
  .controller('NavCtrl', NavCtrl);

  function NavCtrl ($location, $http, BASE_URL) {
    var vm = this,
        fb = new Firebase(BASE_URL),
        id = fb.getAuth().uid;

    $http
      .get(BASE_URL + 'users/' + id + '/profile.json')
      .success(function (data) {
        vm.username = data.username;
      });
  }
