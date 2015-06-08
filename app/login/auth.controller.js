angular
  .module('exquisite')
  .controller('AuthCtrl', AuthCtrl);

  function AuthCtrl($rootScope, $scope, $location, authFactory, BASE_URL) {
    var vm  = this;

    vm.user = {};

    vm.login = function () {
      authFactory.login(vm.user, function (error, authData) {
        if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $rootScope.user = authData;
            $location.path('/canvas');
            // triggers a "digest cycle" to fix async issue with $location.path
            $scope.$apply();
          }
        });
    };

    vm.register = function () {
      var fb = new Firebase(BASE_URL);

      authFactory.register(vm.user, function (error, userData) {
        if (error) {
            switch (error && error.code) {
              case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
              default:
                console.log("Error creating user:", error);
            }
        } else {
          var profileData = { username: vm.user.username, email: vm.user.email };

          console.log("Successfully created user account with uid:", userData.uid);
          fb.child('users/' + userData.uid + "/profile").set(profileData);
          vm.login();

        }
      });
    };

    vm.resetPassword = function () {

      authFactory.resetPassword(vm.user, function (error) {
        if (error) {
          switch (error && error.code) {
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              break;
            default:
              console.log("Error resetting password:", error);
          }
        } else {
          console.log("Password reset email sent successfully!");
        }
      });
    }

  }
