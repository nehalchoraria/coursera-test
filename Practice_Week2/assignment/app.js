(function () {
'use strict';

angular.module('ShoppingListApp',[])
.controller('ShoppingListController',ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory);

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory){

  var list1 = this;
  var shoppingListObj = new ShoppingListFactory();
  list1.shoppingList = shoppingListObj.getBuyItem();
  list1.shoppingList2 = shoppingListObj.getBoughtItem();
  list1.message2="Nothing bought yet."

  list1.changeList = function (index) {
    try{
    list1.message2="";
    shoppingListObj.changeList(index);
    }catch{
       list1.message = "Everything is bought";
    }
  }

}

// BuyShoppingListController.$inject = ['ShoppingListFactory'];
// function BoughtShoppingListController1(ShoppingListFactory){
//   var list2 = this;
// }

function ShoppingListService() {
  var service = this;
  var buyShoppingList = [
      {
          name:"Cookie",
          quantity:20
      },
      {
          name:"IceCream",
          quantity:10
      },
      {
          name:"Milk",
          quantity:5
      },
      {
          name:"Coffee",
          quantity:10
      },
      {
          name:"Veggies",
          quantity:20
      }

  ];
  var boughtShoppingList = [];

  service.getBuyItem = function () {
    return buyShoppingList;
  }

  service.getBoughtItem = function () {
    return boughtShoppingList;
  }

  service.changeList = function (index) {
    var item = {
      name: buyShoppingList[index].name,
      quantity: buyShoppingList[index].quantity
    };

    boughtShoppingList.push(item);
    buyShoppingList.splice(index,1)

    if(buyShoppingList.length==0){
      throw new Error("Everything is bought");
    }

  }

}

function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService();
  };

  return factory;

}



})();
