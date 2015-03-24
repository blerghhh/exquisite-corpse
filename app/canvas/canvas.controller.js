angular
  .module('exquisite')
  .controller('CanvasCtrl', CanvasCtrl);

  function CanvasCtrl ($scope, $location, $firebaseArray, canvasFactory, BASE_URL) {
    var vm         = this,
        fbCanvas   = new Firebase(BASE_URL + "/canvas/test/messages");

    vm.messages = $firebaseArray(fbCanvas);

    vm.addMessage = function() {
      vm.messages.$add({
        text: vm.newMessageText
      });
      vm.newMessageText = null;
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
