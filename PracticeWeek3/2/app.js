(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('menuCategoryController',menuCategoryController)
  .service('menuCategoryService',menuCategoryService)  //We added one more service which checks our requirements
  .constant("ApiBasePath","http://davids-restaurant.herokuapp.com")
  .directive('listItemName',listItemName)

  // function listItemName() {          //One way is this -- > use bits of code and create tag
  //   var ddo = {
  //     template: '{{ item.name }}'
  //   };
  //
  //   return ddo;
  // }

  function listItemName() {          //Second way is this -- > use whole code and create tag
    var ddo = {
      templateUrl: 'itemList.html'
    };

    return ddo;
  }

  menuCategoryController.$inject = ['menuCategoryService'];  //Injecting the service which is a function.
  function menuCategoryController(menuCategoryService)  {
    var menu = this; //Now not using scope anymore
    var promise = menuCategoryService.getmenuCategories();
    promise.then(function (response) {
      menu.categories = response.data;
    })
    .catch(function (error) {
      console.log('Data not fetched')
    });

    menu.menuItems = function (shortName) {
      var promise = menuCategoryService.getMenuForCategory(shortName);
      promise.then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }


  };

  menuCategoryService.$inject = ['$http','ApiBasePath'];
  function menuCategoryService($http,ApiBasePath) {
      var service = this;
      service.getmenuCategories = function () {
        var response = $http(
          {
            method:'GET',
            url:(ApiBasePath + '/categories.json')
          }
        );
        return response;
      }

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
