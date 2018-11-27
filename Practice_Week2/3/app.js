(function () {
  'use strict';
    
  var shoppingList1 = [
      "Item1","Item2","Item3","Item4","Item5","Item6"
  ];
  
  var shoppingList2 = [
      {
          name:"One",
          quantity:200
      },
      {
          name:"Two",
          quantity:200
      },
      {
          name:"Three",
          quantity:300
      },
      {
          name:"Four",
          quantity:400
      }
      
  ];

  angular.module('myFirstApp',[])
  .controller('myFirstController',myFunc);                                                        
  myFunc.$inject = ['$scope','$timeout'];
    
  function myFunc($scope,$timeout)
   {  
       
    $scope.shoppingList1 = shoppingList1;
    $scope.shoppingList2 = shoppingList2;
       
    $scope.additem = function() {  
        
    var newItem = {
        name : $scope.itemname,
        quantity : $scope.itemvalue
    };
    
    $scope.shoppingList2.push(newItem);
    $scope.shoppingList1.concat(shoppingList1);
  
    }

    }
    
   

})();
