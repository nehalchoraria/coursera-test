(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('ShoppingListAddController',ShoppingListAddController)
  .controller('ShoppingListShowController',ShoppingListShowController)
    .service('ShoppingListService',ShoppingListService);  //Similer to Singleton class,lazy initiated

  ShoppingListAddController.$inject = ['ShoppingListService'];  //Injecting the service which is a function.
  function ShoppingListAddController(ShoppingListService)  {
    var itemAdder = this; //Now not using scope anymore
    itemAdder.name = "";
    itemAdder.addItem = function () {
      ShoppingListService.addItem(itemAdder.name);
    }
  }

  ShoppingListShowController.$inject = ['ShoppingListService'];
  function ShoppingListShowController(ShoppingListService) {
    var showList = this;
    showList.items = ShoppingListService.getItem();
    showList.removeItem = function removeItem(itemIndex){
      ShoppingListService.removeItem(itemIndex);
    }
  }

  function ShoppingListService(){

    var service = this;
    var items = [];
    service.addItem = function (itemName) {
      var item = {itemName}
      items.push(item);
    };

    service.getItem = function () {
      return items;
    };

    service.removeItem = function(index){
      items.splice(index,1);
    }
  }

})();
