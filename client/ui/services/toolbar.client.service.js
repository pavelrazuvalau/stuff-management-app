angular.module('ui').service('ToolbarService', function () {
   var toolbar = {};

   this.set = function (_title, _menu, _search, _back) {
       toolbar.title = _title;
       toolbar.menu = _menu;
       toolbar.search = _search;
       toolbar.back = _back;
   };

   this.get = function () {
       return toolbar;
   };
});