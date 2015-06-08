angular
  .module('exquisite')
  .controller('CanvasCtrl', CanvasCtrl);

  function CanvasCtrl ($stateParams, $scope, $location, $firebaseArray, $firebaseObject, canvasFactory, BASE_URL) {
    var vm               = this,
        fb               = new Firebase(BASE_URL),
        id               = $stateParams.uuid,
        user             = fb.getAuth().uid,
        fbUser           = fb.child('/users/'),
        fbCanvas         = fb.child('/canvas/' + id),
        counter,
        wordCount,
        userName;

    vm.messages      = $firebaseArray(fbCanvas.child('/messages'));
    vm.canvases      = $firebaseArray(fb.child('/canvas'));
    vm.canvas        = $firebaseObject(fbCanvas);
    vm.canvasInfo    = $firebaseObject(fbCanvas.child('/info'));
    vm.messageCount  = 0;
    vm.user          = fb.getAuth().uid;

    vm.canvas.$bindTo($scope, "data");

    canvasFactory.findOne(id, function (canvas) {
      vm.info = canvas.info;
      counter = vm.info.counter;
      wordCount = vm.info.wordCount;
    });

    canvasFactory.findUser(user, function (userInfo) {
      vm.username = userInfo.profile.username;
    });

    vm.messages.$loaded().then(function(messages){
      vm.messageCount = messages.length;
      return vm.messageCount;
    });

    ///////// Functions ///////////

    vm.addMessage = function() {
      if (vm.info.counter < vm.info.format.length - 1) {
        vm.post = {text: vm.newMessageText, user: vm.user, username: vm.username};
      } else {
        vm.post = {text: vm.newMessageText + '.', user: vm.user, username: vm.username};
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
                    creator: vm.username,
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

    vm.viewResults = function() {
      return data.wordsNeeded > data.wordCount;
    };

    vm.findUsername = function(id) {
      var user = fb.child('/users/' + id);
      console.log(user);
      user.once('value', function(snap) {
        userName = snap.val().profile.username;
        console.log(userName);
        return userName;
      });
      return userName;
    };

  }
