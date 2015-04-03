angular
  .module('exquisite')
  .controller('CanvasCtrl', CanvasCtrl);

  function CanvasCtrl ($routeParams, $scope, $location, $firebaseArray, $firebaseObject, canvasFactory, BASE_URL) {
    var vm               = this,
        fb               = new Firebase(BASE_URL),
        id               = $routeParams.uuid,
        user             = fb.getAuth().uid,
        users            = [],
        fbUser           = fb.child('/users/' + user),
        fbCanvas         = fb.child('/canvas/' + id),
        counter;

    vm.messages = $firebaseArray(fbCanvas.child('/messages'));
    vm.canvases = $firebaseArray(fb.child('/canvas'));
    vm.canvasInfo = $firebaseObject(fbCanvas.child('/info'));
    vm.messageCount = {};

    canvasFactory.findOne(id, function (data) {
      vm.info = data.info;
      var counter = vm.info.counter;
      console.log(vm.info.format[counter]);
      return counter;
    });



    vm.messages.$loaded().then(function(n){
        vm.messageCount = n.length;
        return vm.messageCount;
      });

    ///////// Functions ///////////

    vm.users = function() {
      var arr   = [],
          users = [];

      for (user in vm.messages) {
        arr.push(vm.messages[user].user);
      }

      users = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
      });

      return users;

    };

    vm.addMessage = function() {

      vm.canvasInfo.$loaded().then(function(data){
        if (data.counter < data.format.length - 1) {
          data.counter = data.counter + 1;
          vm.info.counter = vm.info.counter + 1;
        } else {
          data.counter = 0;
          vm.info.counter = 0;
        }
        data.$save();
      });

      vm.messages.$add({
        text: vm.newMessageText,
        user: user
      });

      vm.newMessageText = null;
      vm.messageCount = Object.keys(vm.messages).length - 17;
      // vm.info.counter = vm.info.counter + 1;
    };

    vm.createCanvas = function() {
      var newCanvas  = $firebaseArray(fb.child('/canvas')),
          format     = vm.canvasFormat.split(" "),
          canvasData = {
            info: { name: vm.canvasName, creator: user, contributors: 1, counter: 0, format: format },
            status: { active: false, private: vm.private || false }
          };

      newCanvas.$add(canvasData).then(function(canvas) {
        $location.path('/canvas/' + canvas.key());
      });

      vm.canvasName = null;
      vm.canvasFormat = null;

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

  }
