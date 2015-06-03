angular
  .module('exquisite')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($routeParams, $firebaseArray, $firebaseObject, profileFactory, canvasFactory, BASE_URL) {
  var vm  = this,
      fb  = new Firebase(BASE_URL),
      id  = fb.getAuth().uid;

  vm.canvases = $firebaseArray(fb.child('/canvas'));
  vm.userId = id;

  profileFactory.findOne(id, function (user) {
    vm.user = user;
  });

  vm.removeStory = function (id) {
    var story = $firebaseObject(fb.child('/canvas/' + id));
    story.$remove().then(function(story){
      console.log("story deleted");
    });
  };

}
