  (function () {
'use strict';

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
  templateUrl: 'shoppingList.html',
  controller: ShoppingListComponentController,
  bindings:{
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

function ShoppingListComponentController() {
  var $ctrl = this;

  $ctrl.cookiesInList = function () {
    for (var i = 0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      console.log('name',name)
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        console.log('true')
        return true;
      }
    }
    return false;
  };

  $ctrl.remove = function (myIndex) {
    $ctrl.onRemove({index:myIndex});
  };

  $ctrl.$onInit = function () {
    console.log("We are onInit func");
  };

  
}


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var viewList = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  viewList.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  viewList.title = origTitle + " (" + viewList.items.length + " items )";

  viewList.itemName = "";
  viewList.itemQuantity = "";

  viewList.addItem = function () {
    shoppingList.addItem(viewList.itemName, viewList.itemQuantity);
    viewList.title = origTitle + " (" + viewList.items.length + " items )";
  };

  viewList.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + viewList.items.length + " items )";
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
