angular
  .module('exquisite')
  .controller('StoryCtrl', StoryCtrl);

  function StoryCtrl ($stateParams, $scope, $location, $firebaseArray, $firebaseObject, storyFactory, BASE_URL) {
    var vm         = this,
        fb         = new Firebase(BASE_URL),
        id         = $stateParams.uuid,
        user       = fb.getAuth().uid,
        fbUser     = fb.child('/users/'),
        fbStory    = fb.child('/story/' + id),
        counter,
        wordCount,
        userName;

    vm.story       = $firebaseObject(fbStory);
    vm.storyInfo   = $firebaseObject(fbStory.child('/info'));
    vm.user        = fb.getAuth().uid;
    vm.currentUser = $firebaseObject(fb.child('/users/' + user));

    vm.posArray = ['article', 'verb', 'noun', 'auxiliary-verb', 'preposition',
                  'adverb', 'conjunction', 'adjective'];
    vm.newStoryPosArray = [];

    vm.addPos = function(pos) {
      vm.newStoryPosArray.push(pos);
    };

    vm.deletePos = function(pos) {
      var index = pos,
          plusOne = pos + 1;
      vm.newStoryPosArray.splice(pos, 1);
      console.log(vm.newStoryPosArray);
    };

    vm.defaultPos = function() {
      vm.newStoryPosArray = ['article', 'adjective', 'noun', 'auxiliary-verb',
                            'verb', 'article', 'adjective', 'noun'];
    };

    vm.story.$bindTo($scope, "data");
    vm.story.$loaded().then(function(data){
      if (data.messages != undefined) {
        vm.messageCount = data.messages.length
      }
    });

    storyFactory.findUser(user, function (userInfo) {
      vm.username = userInfo.profile.username;
    });



    ///////// Functions ///////////

    vm.addMessage = function() {
      if (vm.story.info.counter < vm.story.info.format.length - 1) {
        vm.post = {text: vm.newMessageText, user: vm.currentUser.$id, username: vm.currentUser.profile.username};
      } else {
        vm.post = {text: vm.newMessageText + '.', user: vm.currentUser.$id, username: vm.currentUser.profile.username};
      }

      storyFactory.addMessage(vm.post).then(function(){
        vm.newMessageText = null;
      });

      vm.storyInfo.$loaded().then(function(data){
        if (data.counter < data.format.length - 1) {
          data.counter = data.counter + 1;
          vm.story.info.counter = vm.story.info.counter + 1;
        } else {
          data.counter = 0;
          vm.story.info.counter = 0;
        }
        data.wordCount = data.wordCount + 1;
        data.$save();
      });

    };

    vm.createStory = function() {
      var newStory  = $firebaseArray(fb.child('/story')),
          storyData = {
            info: { name: vm.storyName,
                    creator: vm.username,
                    contributors: 1,
                    counter: 0,
                    wordCount: 0,
                    wordsNeeded: vm.newStoryPosArray.length * vm.storyWordsNeeded,
                    format: vm.newStoryPosArray },
            status: { active: false, private: vm.private || false }
          };

      newStory.$add(storyData).then(function(story) {
        $location.path('/story/' + story.key());
      });

      vm.storyName = null;
      vm.storyFormat = null;
      vm.storyWordCount = null;

    };

    vm.userNumber = function(author) {
      var arr = [];
      for (user in vm.story.messages) {
        arr.push(vm.story.messages[user].user);
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
