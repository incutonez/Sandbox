Ext.define('JefBox.shared.Routes', {
  singleton: true,
  alternateClassName: [
    'Routes'
  ],

  basePath: '',
  paths: [{
    /**
     * @property HOME
     */
    key: 'HOME',
    basePath: 'home'
  }, {
    /**
     * @property USERS
     */
    key: 'USERS',
    basePath: 'users'
  }],

  constructor: function(config) {
    this.callParent(arguments);
    var paths = this.paths;
    for (var i = 0; i < paths.length; i++) {
      this.buildPath(paths[i], this.basePath);
    }
  },

  buildPath: function(path, parentPath) {
    if (path) {
      var paths = path.paths;
      if (parentPath) {
        parentPath += '/';
      }
      parentPath += path.basePath;
      this[path.key] = parentPath;
      if (paths) {
        this.buildPath(paths, parentPath);
      }
    }
  }
});