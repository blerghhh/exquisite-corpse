angular
  .module('exquisite')
  .factory('canvasFactory', canvasFactory);

function canvasFactory($http, $firebaseArray, $firebaseObject, $routeParams, BASE_URL) {
  var fb       = new Firebase(BASE_URL),
      id       = $routeParams.uuid,
      user     = fb.getAuth().uid,
      fbCanvas = fb.child('canvas/' + id),
      messages = $firebaseArray(fbCanvas.child('/messages')),
      info     = $firebaseObject(fbCanvas.child('/info')),
      status   = $firebaseObject(fbCanvas.child('/status')),
      canvas   = {};

  canvas.addMessage = function(data) {
    id = $routeParams.uuid;
    fbCanvas = fb.child('canvas/' + id);
    messages = $firebaseArray(fbCanvas.child('/messages'));

    return messages.$add(data);
  };

  canvas.update = function(data) {

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
  };

  canvas.findOne = function (id, cb) {
    $http
      .get(BASE_URL + 'canvas/' + id + '.json')
      .success(function (data) {
        cb(data);
      });
  };

  canvas.toggleOn = function () {
    status.active = true;
    status.user = user;
    status.$save();
    console.log(user + ' is typing...');
  };

  canvas.toggleOff = function () {
    status.active = false;
    status.$save();
  };

return canvas;

}
