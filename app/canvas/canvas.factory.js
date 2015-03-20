angular
  .module('exquisite')
  .factory('canvasFactory', canvasFactory);

function canvasFactory($http, BASE_URL) {
  var canvas = {};

  canvas.findOne = function (id, cb) {
    $http
      .get(BASE_URL + 'canvas/' + id + '.json')
      .success(function (data) {
        cb(data);
      });
  };

  canvas.findAll = function (cb) {
    $http
    .get(BASE_URL + 'canvas.json')
    .success(function (data){
      cb(data);
    });
  };

  canvas.create = function (data, cb) {
    $http
    .post(BASE_URL + 'canvas.json', data)
    .success(function (res) {
      cb(res);
    });
  };

  canvas.delete = function (id, cb) {
    $http
    .delete(BASE_URL + 'canvas/' + id + '.json')
      .success(function (res) {
        cb(res);
      });
  };

  canvas.update = function (id, data, cb) {
    var url = BASE_URL + 'canvas/' + id + '.json';

    $http
    .put(url, data)
      .success(function (res) {
        if (typeof cb === 'function') {
          cb(res);
        }
      });
  };

return canvas;

}
