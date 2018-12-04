(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('ShoppingListAddController',ShoppingListAddController)
  .controller('ShoppingListShowController',ShoppingListShowController)
  .service('ShoppingListService',ShoppingListService)  //Similer to Singleton class,lazy initiated
  .service('CheckingService',CheckingService);  //We added one more service which checks our requirements

  ShoppingListAddController.$inject = ['ShoppingListService'];  //Injecting the service which is a function.
  function ShoppingListAddController(ShoppingListService)  {
    var itemAdder = this; //Now not using scope anymore
    itemAdder.name = "";
    itemAdder.quantity = "";
    itemAdder.addItem = function () {
      ShoppingListService.addItem(itemAdder.name,itemAdder.quantity);
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

  ShoppingListService.$inject = ['$q','CheckingService'];
  function ShoppingListService($q,CheckingService) {
    var service = this;
    var items = [];
    service.addItem = function (itemName,itemQuantity) {

      var namePromise = CheckingService.checkName(itemName);                     //Gets back promise which has resolve or reject
      var quantityPromise = CheckingService.checkQuantity(itemQuantity);

      $q.all([namePromise,quantityPromise]).                 // Format --> q.all([tocheck]).then(f()).catch(f())
      then(function (response) {
        var item = {
          'itemName':itemName,
          'itemQuantity':itemQuantity
        };
        items.push(item);
      })
      .catch(function (errorResponse) {
        console.log(errorResponse.message);
      })
    };

    service.getItem = function () {
      return items;
    };

    service.removeItem = function(index){
      items.splice(index,1);
    }
  }

  CheckingService.$inject = ['$q','$timeout'];
  function CheckingService($q,$timeout){
    var service = this;

    service.checkName = function (name) {
      var deferred = $q.defer();
      var result = {
        message:""
      };

      $timeout(function () {
        if(name.toLowerCase().indexOf('cookie') === -1) {
          deferred.resolve(result);
        }else{
          result.message = "No cookie for you!";
          deferred.reject(result);
        }
      },3000)

      return deferred.promise;

    }

    service.checkQuantity = function (quantity) {
      var deferred = $q.defer();
      var result = {
        message:""
      };

      $timeout(function () {
        if(quantity < 4) {
          deferred.resolve(result);
        }else{
          result.message = "Too much ordering!";
          deferred.reject(result);
        }
      },3000)

      return deferred.promise;

    }


  }

})();
