angular
  .module('exquisite')
  .controller('CanvasCtrl', CanvasCtrl);

  function CanvasCtrl ($routeParams, $scope, $location, $firebaseArray, canvasFactory, BASE_URL) {
    var vm               = this,
        fb               = new Firebase(BASE_URL),
        id               = $routeParams.uuid,
        user             = fb.getAuth().uid,
        fbUser           = fb.child('/users/' + user),
        fbCanvas         = fb.child('/canvas/' + id);

    vm.messages = $firebaseArray(fbCanvas.child('/messages'));
    vm.canvases = $firebaseArray(fb.child('/canvas'));

    canvasFactory.findOne(id, function (data) {
      vm.info = data.info;
    });

    vm.addMessage = function() {
      vm.messages.$add({
        text: vm.newMessageText
      });
      vm.newMessageText = null;
    };

    vm.createCanvas = function() {
      var userData,
          canvasData;

      vm.newCanvas = $firebaseArray(fb.child('/canvas'));

      fbUser.once('value', function(snap) {
        userData = snap.val();
        canvasData = {
          info: { name: vm.canvasName, creator: userData.profile.username },
          status: { active: false, private: vm.private || false }
        };

        vm.newCanvas.$add(canvasData).then(function(cb) {
          $location.path('/canvas/' + cb.key());
        });

        vm.canvasName = null;

      });


    };

    vm.toggleOn = function() {
      canvasFactory.toggleOn({active: true})
    };

    vm.toggleOff = function() {
      canvasFactory.toggleOff({active: false})
    };

    vm.addOrEditCanvas = function () {
      canvasFactory.create(vm.newCanvas, function (res) {
        vm.data[res.name] = vm.newCanvas;
        $location.path('/canvas');
      });
    };

    vm.removeCanvas = function (id) {
      canvasFactory.delete(id, function () {
        delete vm.data[id];
      });
    };

    vm.updateCanvas = function (id) {
      canvasFactory.update(id, vm.data[id]);
    };

  }
