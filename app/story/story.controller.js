angular
  .module('exquisite')
  .controller('StoryCtrl', StoryCtrl);

  function StoryCtrl ($stateParams, $scope, $location, $firebaseArray, $firebaseObject, storyFactory, BASE_URL) {
    var vm               = this,
        fb               = new Firebase(BASE_URL),
        id               = $stateParams.uuid,
        user             = fb.getAuth().uid,
        fbUser           = fb.child('/users/'),
        fbStory         = fb.child('/story/' + id),
        counter,
        wordCount,
        userName;

    vm.messages      = $firebaseArray(fbStory.child('/messages'));
    vm.stories      = $firebaseArray(fb.child('/story'));
    vm.story        = $firebaseObject(fbStory);
    vm.storyInfo    = $firebaseObject(fbStory.child('/info'));
    vm.messageCount  = 0;
    vm.user          = fb.getAuth().uid;

    vm.story.$bindTo($scope, "data");

    storyFactory.findOne(id, function (story) {
      vm.info = story.info;
      counter = vm.info.counter;
      wordCount = vm.info.wordCount;
    });

    storyFactory.findUser(user, function (userInfo) {
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

      storyFactory.addMessage(vm.post).then(function(){
        vm.newMessageText = null;
      });

      vm.storyInfo.$loaded().then(function(data){
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

    vm.createStory = function() {
      var newStory  = $firebaseArray(fb.child('/story')),
          format     = vm.storyFormat.split(" "),
          storyData = {
            info: { name: vm.storyName,
                    creator: vm.username,
                    contributors: 1,
                    counter: 0,
                    wordCount: 0,
                    wordsNeeded: vm.storyWordsNeeded,
                    format: format },
            status: { active: false, private: vm.private || false }
          };

      newStory.$add(storyData).then(function(story) {
        console.log(story.key());
        $location.path('/story/' + story.key());

      });

      vm.storyName = null;
      vm.storyFormat = null;
      vm.storyWordCount = null;

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
      storyFactory.toggleOn();
    };

    vm.toggleOff = function() {
      storyFactory.toggleOff();
    };

    vm.addOrEditStory = function () {
      storyFactory.create(vm.newStory, function (res) {
        vm.data[res.name] = vm.newStory;
        $location.path('/story');
      });
    };

    vm.removeStory = function (id) {
      storyFactory.delete(id, function () {
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
