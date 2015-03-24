angular
  .module('exquisite')
  .factory('profileFactory', profileFactory);

function profileFactory($http, BASE_URL) {
  var profile = {};

  profile.findOne = function (user, cb) {
    $http
      .get(BASE_URL + 'users/' + user + '/profile.json')
      .success(function (data) {
        cb(data);
      });
  };

  return profile;
}
