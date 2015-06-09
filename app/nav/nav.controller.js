angular
  .module('exquisite')
  .controller('NavCtrl', NavCtrl);

function NavCtrl ($location, $scope, $http, $firebaseArray, BASE_URL) {
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

  vm.stories = $firebaseArray(fb.child('/story'));
  vm.stories.$loaded().then(function(stories){
    stories.forEach(function(i){
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

  vm.smallDeviceSidebarToggle = function() {
    var width = $( window ).width();
    if (width < 600) {
      $(".wrapper").toggleClass("toggled");
    }
  }

  vm.randomStory = function() {
    var randomStory = storyIds[Math.floor(Math.random() * storyIds.length)];
    $location.path('/story/' + randomStory);
  };

}
