angular
  .module('exquisite')
  .factory('storyFactory', storyFactory);

function storyFactory($http, $firebaseArray, $firebaseObject, $stateParams, BASE_URL) {
  var fb       = new Firebase(BASE_URL),
      id       = $stateParams.uuid,
      user     = fb.getAuth().uid,
      fbStory  = fb.child('story/' + id),
      messages = $firebaseArray(fbStory.child('/messages')),
      info     = $firebaseObject(fbStory.child('/info')),
      status   = $firebaseObject(fbStory.child('/status')),
      story    = {};

  story.addMessage = function(data) {
    id = $stateParams.uuid;
    fbStory = fb.child('story/' + id);
    messages = $firebaseArray(fbStory.child('/messages'));

    return messages.$add(data);
  };

  story.findOne = function (id, cb) {
    $http
      .get(BASE_URL + 'story/' + id + '.json')
      .success(function (data) {
        cb(data);
      });
  };

  story.findUser = function (id, cb) {
    $http
      .get(BASE_URL + 'users/' + id + '.json')
      .success(function (data) {
        cb(data);
      });
  };

  story.toggleOn = function () {
    status.active = true;
    status.user = user;
    status.$save();
    console.log(user + ' is typing...');
  };

  story.toggleOff = function () {
    status.active = false;
    status.$save();
  };

return story;

}
