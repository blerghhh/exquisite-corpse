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
        counter,
        wordCount

    vm.messages      = $firebaseArray(fbCanvas.child('/messages'));
    vm.canvases      = $firebaseArray(fb.child('/canvas'));
    vm.canvas        = $firebaseObject(fbCanvas);
    vm.canvasInfo    = $firebaseObject(fbCanvas.child('/info'));
    vm.messageCount  = 0;

    vm.canvas.$bindTo($scope, "data").then(function() {
    });

    canvasFactory.findOne(id, function (data) {
      vm.info = data.info;
      counter = vm.info.counter;
      wordCount = vm.info.wordCount;

    });

    vm.messages.$loaded().then(function(data){
      vm.messageCount = data.length;
      return vm.messageCount;
    });

    vm.canvas.$loaded().then(function(data){

      if (data.messages) {
        vm.messageCount = Object.keys(data.messages).length;
        if (vm.messageCount < data.info.wordCount) {
          vm.messagesRemaining = data.info.wordCount - vm.messageCount;
        } else {
          vm.messagesRemaining = 0;
        }
      } else {
        vm.messageCount = 0;
        vm.messagesRemaining = data.info.wordCount;
      }

      return vm.messagesRemaining;
    });

    ///////// Functions ///////////

    vm.addMessage = function() {
      if (vm.info.counter < vm.info.format.length - 1) {
        vm.post = {text: vm.newMessageText, user: user};
      } else {
        vm.post = {text: vm.newMessageText + '.', user: user};
      }

      canvasFactory.addMessage(vm.post).then(function(){
        vm.newMessageText = null;
      });

      vm.canvasInfo.$loaded().then(function(data){
        if (data.counter < data.format.length - 1) {
          data.counter = data.counter + 1;
          vm.info.counter = vm.info.counter + 1;
        } else {
          data.counter = 0;
          vm.info.counter = 0;
        }
        data.wordCount = data.wordCount + 1;
        data.lastUser = user;
        data.$save();
      });

    };

    vm.createCanvas = function() {
      var newCanvas  = $firebaseArray(fb.child('/canvas')),
          format     = vm.canvasFormat.split(" "),
          canvasData = {
            info: { name: vm.canvasName,
                    creator: user,
                    contributors: 1,
                    counter: 0,
                    wordCount: 0,
                    wordsNeeded: vm.canvasWordsNeeded,
                    format: format },
            status: { active: false, private: vm.private || false }
          };

      newCanvas.$add(canvasData).then(function(canvas) {
        console.log(canvas.key());
        $location.path('/canvas/' + canvas.key());

      });

      vm.canvasName = null;
      vm.canvasFormat = null;
      vm.canvasWordCount = null;

    };

    vm.userNumber = function(author) {
      var arr = [];
      for (user in vm.messages) {
        arr.push(vm.messages[user].user);
      }
      users = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
      });
      return users.indexOf(author);
    };

    vm.toggleOn = function() {
      canvasFactory.toggleOn();
    };

    vm.toggleOff = function() {
      canvasFactory.toggleOff();
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
