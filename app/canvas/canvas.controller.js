angular
  .module('exquisite')
  .controller('CanvasCtrl', CanvasCtrl);

  function CanvasCtrl ($location, canvasFactory) {
    var vm  = this;

    canvasFactory.findAll(function (canvas) {
      vm.data = canvas;
    });

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
