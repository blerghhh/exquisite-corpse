angular
  .module('exquisite')
  .controller('BrowseCtrl', BrowseCtrl);

  function BrowseCtrl ($location, $firebaseArray, canvasFactory, BASE_URL) {
    var vm       = this,
        fb       = new Firebase(BASE_URL),
        id,
        data,
        fbUsers  = fb.child('/users');

    fbUsers.on('value', function(snap){
      var data = snap.val();
      return data;
    })

    vm.canvases = $firebaseArray(fb.child('/canvas'));

    vm.findUsername = function() {
      // id = vm.info.creator;
      return 'thisUser';
    }

    vm.user = vm.findUsername();

  }
