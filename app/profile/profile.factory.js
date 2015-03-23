angular
  .module('exquisite')
  .factory('profileFactory', profileFactory);

function profileFactory($http, BASE_URL) {
  var profile = {};

  profile.findOne = function (userName, cb) {
    $http
      .get(BASE_URL + 'users/' + userName + '.json')
      .success(function (data) {
        cb(data);
      });
  };

  return profile;
}
