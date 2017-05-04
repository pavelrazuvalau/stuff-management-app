angular.module('ui').service('ToolbarService', function () {
   var toolbar = {};

   this.setToolbar = function (_title, _menu, _search) {
       toolbar.title = _title;
       toolbar.menu = _menu;
       toolbar.search = _search;
   };

   this.getToolbar = function () {
       return toolbar;
   }
});