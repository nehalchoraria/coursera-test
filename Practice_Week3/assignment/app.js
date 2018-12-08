(function () {
'use strict';

angular.module('searchApp', [])
.controller('MyController', MyController)
.constant("ApiBasePath","http://davids-restaurant.herokuapp.com")
.service('menuCategoryService',menuCategoryService)
.directive('foundItems', ResultListDirective);

function ResultListDirective() {
  var ddo = {
    templateUrl: 'resultList.html',
  };
  return ddo;
}


MyController.inject=['menuCategoryService','$q']
function MyController(menuCategoryService,$q) {
  var list = this;
  list.foundItems = [] ;
  list.inputString = "";

    list.searchString = function () {
      var menu = this;
      list.foundItems = [];

      if(!list.inputString==""){
      var promise = menuCategoryService.getMenuForCategory();
      promise.then(function (response) {
        console.log(response.data.menu_items)

        for ( var j=0 ; j < response.data.menu_items.length ; j++) {
          if ( (response.data.menu_items[j].description+"").toLowerCase().includes(list.inputString) ) {
                var dish = { name:response.data.menu_items[j].name , desc:response.data.menu_items[j].description };
                list.foundItems.push(dish) }
          }
          }).catch(function () {
            console.log('Data not fetched')
          })
      }
      }

    list.removeItem = function(index) {
        list.foundItems.splice(index, 1);
    }

    list.checkEmpty = function () {

      if(list.foundItems.length>0){
        return false;
      }else{
        return true;
      }
    }

  };

  menuCategoryService.$inject = ['$http','ApiBasePath'];
  function menuCategoryService($http,ApiBasePath) {
      var service = this;

      service.getMenuForCategory = function (shortName) {
        var response = $http(
          {
            method:'GET',
            url:(ApiBasePath + '/menu_items.json'),
            params:{
              category:shortName
            }
          }
        );
        return response;
      }
  }

})();
