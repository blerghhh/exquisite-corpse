angular
  .module('exquisite')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($stateParams, $firebaseArray, $firebaseObject, BASE_URL) {
  var vm  = this,
      fb  = new Firebase(BASE_URL),
      id  = fb.getAuth().uid;

  vm.stories = $firebaseArray(fb.child('/story'));
  vm.username = $stateParams.username;
  vm.userId = id;
  vm.user = $firebaseObject(fb.child('/users/' + id));

  vm.removeStory = function (id) {
    var story = $firebaseObject(fb.child('/story/' + id));
    story.$remove().then(function(story){
      console.log("story deleted");
    });
  };

}
