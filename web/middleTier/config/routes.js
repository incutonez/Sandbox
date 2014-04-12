exports.routes = function (map) {
  map.get('/logger', 'LoggerController#index');
};
