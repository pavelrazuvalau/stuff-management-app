angular.module('ui').service('ToolbarService', function () {
   var toolbar = {};

    this.setTitle = function (_title) {
        toolbar.title = _title;
    };

    this.setMenu = function (_menu) {
        toolbar.menu = _menu;
    };

    this.setSearch = function (_search) {
        toolbar.search = _search
    };

    this.setBack = function (_back) {
        toolbar.back = _back
    };

   this.set = function (_title, _menu, _search, _back) {
       this.setTitle(_title);
       this.setMenu(_menu);
       this.setSearch(_search);
       this.setBack(_back);
   };

   this.get = function () {
       return toolbar;
   };
});