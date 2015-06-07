angular
  .module('exquisite')
  .controller('NavCtrl', NavCtrl);

function NavCtrl ($location, $http, $firebaseArray, BASE_URL) {
  var vm = this,
      fb = new Firebase(BASE_URL),
      id;

  if (fb.getAuth()) {
    id = fb.getAuth().uid;
    $http
      .get(BASE_URL + 'users/' + id + '/profile.json')
      .success(function (data) {
        vm.username = data.username;
      });
  }

  vm.isLoggedIn = function() {
    return !!fb.getAuth();
  };

  vm.sidebarToggle = function() {
    $(".wrapper").toggleClass("toggled");
  };

  vm.randomCanvas = function() {
    var canvases = $firebaseArray(fb.child('/canvas')),
        arr      = [],
        randomCanvas;
    canvases.$loaded().then(function(canvases){
      canvases.forEach(function(i){
        if (i.status.private === false) {
          arr.push(i.$id);
        }
      });
      randomCanvas = arr[Math.floor(Math.random() * arr.length)];
      $location.path('/canvas/' + randomCanvas);
    });
  };

}
