'use strict';

import MainCtrl from './main/main.controller';

angular
  .module('exquisite', ['lumx', 'ngRoute'])
  .controller('MainCtrl', MainCtrl)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
