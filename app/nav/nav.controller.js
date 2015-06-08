angular
  .module('exquisite')
  .controller('NavCtrl', NavCtrl);

function NavCtrl ($location, $http, $firebaseArray, BASE_URL) {
  var vm       = this,
      fb       = new Firebase(BASE_URL),
      storyIds = [],
      id;

  if (fb.getAuth()) {
    id = fb.getAuth().uid;
    $http
      .get(BASE_URL + 'users/' + id + '/profile.json')
      .success(function (data) {
        vm.username = data.username;
      });
  }

  vm.canvases = $firebaseArray(fb.child('/canvas'));
  vm.canvases.$loaded().then(function(canvases){
    canvases.forEach(function(i){
      if (i.status.private === false) {
        storyIds.push(i.$id);
      }
    return storyIds;
    });
  });

  vm.isLoggedIn = function() {
    return !!fb.getAuth();
  };

  vm.sidebarToggle = function() {
    $(".wrapper").toggleClass("toggled");
  };

  vm.randomCanvas = function() {
    var randomCanvas = storyIds[Math.floor(Math.random() * storyIds.length)];
    $location.path('/canvas/' + randomCanvas);
  };

}
