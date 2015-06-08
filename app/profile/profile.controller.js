angular
  .module('exquisite')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($stateParams, $firebaseArray, $firebaseObject, profileFactory, canvasFactory, BASE_URL) {
  var vm  = this,
      fb  = new Firebase(BASE_URL),
      id  = fb.getAuth().uid,
      username = $stateParams.username;

  vm.canvases = $firebaseArray(fb.child('/canvas'));
  vm.userId = id;
  vm.username = $stateParams.username;

  profileFactory.findOne(id, function (userInfo) {
    vm.user = userInfo;
  });

  vm.removeStory = function (id) {
    var story = $firebaseObject(fb.child('/canvas/' + id));
    story.$remove().then(function(story){
      console.log("story deleted");
    });
  };

}
