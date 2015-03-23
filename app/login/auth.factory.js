angular
  .module('exquisite')
  .factory('authFactory', authFactory);

function authFactory(BASE_URL) {
  return {

    isLoggedIn: function () {
      var fb = new Firebase(BASE_URL);

      return !!fb.getAuth();
    },

    getAuth: function () {
      var fb = new Firebase(BASE_URL);

      return fb.getAuth();
    },

    login: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.authWithPassword(user, cb);
    },

    register: function (user, cb) {
      var fb        = new Firebase(BASE_URL),
          profileData = { username: user.username, email: user.email};

      fb.createUser(user, cb);
      fb.child('users/' + user.username + "/profile").set(profileData);
    },

    logout: function (cb) {
      var fb = new Firebase(BASE_URL);

      fb.unauth(cb);
    },

    resetPassword: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.resetPassword(user, cb);
    }
  };
}
