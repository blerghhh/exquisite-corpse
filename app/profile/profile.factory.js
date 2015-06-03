angular
  .module('exquisite')
  .factory('profileFactory', profileFactory);

function profileFactory($http, $stateParams, BASE_URL) {
  var profile = {};

  profile.findOne = function (id, cb) {
    $http
      .get(BASE_URL + 'users/' + id + '/profile.json')
      .success(function (data) {
        cb(data);
      });
  };
  
  return profile;
}
