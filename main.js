$(function() {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
    });
  });

  var myApp = angular.module('monhoc',["ngRoute"]);


  myApp.config(function($routeProvider){
    $routeProvider
    .when("/",{templateUrl:"cacmonhoc.html"})
    .when("/gioithieu",{templateUrl:"gioithieu.html"})
    .when("/mon/:id/:nameMon",{templateUrl:"chon.html" , controller:"monController"})
    // .when("/mon",{templateUrl:"chon.html"})
    .when("/dangxuat",{templateUrl:"dangxuat.html"})
    .when("/login",{templateUrl:"login.html"})
    .otherwise({templateUrl:"cacmonhoc.html"})
  })
 

  myApp.controller('monController',function($scope , $routeParams, $http){
    var id = $routeParams.id;
    var name = $routeParams.nameMon;

    $scope.Name = name ;
    $http.get("db/Quizs/" + id + ".js").then(function(r) {

      $scope.subject = r.data;
 

    })
    

    $scope.nextQs = function(id) { 
      console.log(id)
      $scope.subject.forEach(item => {
        
        if(item.Id == id) {
          $scope.cauhoi = item;
        }
      });
    }
  })



  myApp.controller('monhoccontroller',function($scope){
    $scope.subjects = subjects
   
    $scope.image="../ASM/images/.jpg"
    
    
    
  })


