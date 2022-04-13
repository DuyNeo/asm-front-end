$(function () {
  // Sidebar toggle behavior
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").toggleClass("active");
  });
});

var myApp = angular.module("monhoc", ["ngRoute"]);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", { templateUrl: "cacmonhoc.html" , controller : "monhoccontroller" })
    .when("/gioithieu", { templateUrl: "gioithieu.html" })
    .when("/mon/:id/:nameMon", {
      templateUrl: "chon.html",
      controller: "monController",
    })
    // .when("/mon",{templateUrl:"chon.html"})
    .when("/dangxuat", { templateUrl: "dangxuat.html" })
    .when("/login", { templateUrl: "login.html" })
    .when("/hoanthanh",{templateUrl: "hoanthanhbaithi.html" , controller: "hoanthanhController"})
    .otherwise({ templateUrl: "cacmonhoc.html" , controller : "monhoccontroller"  });
});

myApp.controller("monController", function ($scope, $routeParams, $http , $rootScope) {
  var id = $routeParams.id;
  var name = $routeParams.nameMon;

  $rootScope.Name = name;
  $http.get("db/Quizs/" + id + ".js").then(function (r) {
    $scope.subject = r.data;
    $scope.cauhoi = $scope.subject[0];
    $scope.CurentQs = 0;
    // code thu ne`
    $scope.answers = {};
    $scope.coreectCount = 0;
    $scope.countCorrect = false;
    // $scope.showResult=function(){
    //   $scope.countCorrect=true;
    //   $scope.coreectCount=0;
    //   var qLength = $scope.subject.length;
    //   for(var i=0;i<qLength;i++){
    //     var answers=$scope.subject[i].answers;
    //     $scope.subject[i].userAnswerCorrect=false;
    //     $scope.subject[i].userAnswer=$scope.answers[i];
    //     for(var j=0;k<answers.length;j++){
    //       answers[j].selected="donno";
    //       if($scope.subject[i].userAnswer===answers[j].)
    //     }
    //   }
    // }
  });

  $scope.CurentQs = 0;
  $scope.SelectQs = function (num) {
    $scope.cauhoi = $scope.subject[num];

    $scope.CurentQs = num;
  };
  //nút tới
  $scope.next = function () {
    if ($scope.CurentQs == $scope.subject.length - 1) {
      $scope.CurentQs = 0;
      $scope.cauhoi = $scope.subject[0];
      focus($scope.cauhoi.Id);
    } else {
      $scope.CurentQs += 1;
      $scope.cauhoi = $scope.subject[$scope.CurentQs];
      focus($scope.cauhoi.Id);
    }
  };
  function focus(id) {
    document.getElementById("qs-" + id).focus();
  }
  //nút lùi
  $scope.previous = function () {
    if ($scope.CurentQs == 0) {
      $scope.CurentQs = $scope.subject.length - 1;
      $scope.cauhoi = $scope.subject[$scope.CurentQs];
      focus($scope.cauhoi.Id);
    } else {
      $scope.CurentQs -= 1;
      $scope.cauhoi = $scope.subject[$scope.CurentQs];
      focus($scope.cauhoi.Id);
    }
  };
  //nếu chọn r thì sẽ màu xanh kh thì kh có màu gì hết
  $scope.checkQS = function (id , idasw) {
  
    var element = angular.element(document.querySelector("#qs-" + id));
    element.addClass("bg-success text-light");
    element.removeClass("bg-light text-dark");

    // thêm 1 trường dữ liệu để lưu câu trả lời 
    $scope.cauhoi.traloi = idasw; //biến này lưu cái id answ
  };

  // hoan thanh bai thi 
  $scope.submit = function(){
    // tính toán 
    var diem  = 0 ; 
    var dung  = 0; 
    var sai  = 0;
    $scope.subject.forEach(item => {
      
      if(item.AnswerId == item.traloi) // nếu cái AnswerId == tra loi thì đúng 
      {
        dung++; 
        item.isCorrect = true ;
      }
      else {
        sai++;
        if(item.traloi == null) item.isCorrect = null;
        else 
        item.isCorrect = false ;

      }
    });
    diem = ((10 /  (dung + sai)) * dung).toFixed(1); 
    var ketqua = {
      mark : diem , correct : dung , error : sai
    }
    $rootScope.ketqua = ketqua; 
    $rootScope.subject = $scope.subject ; // lưu kết quả vào biến root cha
  }
});

myApp.controller("monhoccontroller", function ($scope , $http) {
  $http.get("db/Subjects.js").then(function(r){
    $scope.subjects = r.data;
    $scope.page = (r.data.length / 4).toFixed();

  })
  $scope.image = "../ASM/images/.jpg";
  $scope.start=0; 
  $scope.end=0;
  $scope.tiep=function(){
    if($scope.start == $scope.page -1 ) 
    $scope.start = 0;
    else {
     $scope.start ++;

    }
  }
  // $scope.tiep = function(){
  //   if($scope.start){
  //     $scope.start += 1;
  //   }
  // }
  $scope.lui=function(){
    if($scope.start == 0 ) 
    $scope.start = $scope.page -1;
    else {
      $scope.start -- ;
    }
   
  }
 
});
///
myApp.controller("accountctrl", myfuns);
function myfuns($scope , $http) {
  $http.get("db/Students.js").then(function(r){
    $scope.hs = r.data;
 })
  $scope.dn = function () {
 
    var u = $scope.u;
    var p = $scope.p;
    var tc = false;
    var motsv;


  
    for (var i = 0; i <  $scope.hs.length ; i++) {
      motsv =  $scope.hs[i];
      
      if (u == motsv.username && p == motsv.password) {
    
        tc = true;
        break;
      }
    }
    
    if (tc) {
      sessionStorage.setItem("username", motsv.username);
      sessionStorage.setItem("hoten", motsv.fullname);
     
      sessionStorage.setItem("isLogin", true);
      document.location = "trangchu.html";
    }else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
      sessionStorage.setItem("isLogin", false);

    }
  }
};

//controller hoanthanhbai thi
myApp.controller("hoanthanhController", function ($scope, $routeParams, $http , $rootScope) {
    
    $scope.subject = $rootScope.subject;
    $scope.cauhoi = $scope.subject[0];
    $scope.CurentQs = 0;
  
  //nút tới
  $scope.next = function () {
    if ($scope.CurentQs == $scope.subject.length - 1) {
      $scope.CurentQs = 0;
      $scope.cauhoi = $scope.subject[0];
      focus($scope.cauhoi.Id);
    } else {
      $scope.CurentQs += 1;
      $scope.cauhoi = $scope.subject[$scope.CurentQs];
      focus($scope.cauhoi.Id);
    }
  };
  function focus(id) {
    document.getElementById("qs-" + id).focus();
  }
  //nút lùi
  $scope.previous = function () {
    if ($scope.CurentQs == 0) {
      $scope.CurentQs = $scope.subject.length - 1;
      $scope.cauhoi = $scope.subject[$scope.CurentQs];
      focus($scope.cauhoi.Id);
    } else {
      $scope.CurentQs -= 1;
      $scope.cauhoi = $scope.subject[$scope.CurentQs];
      focus($scope.cauhoi.Id);
    }
  };
  $scope.SelectQs = function (num) {
    $scope.cauhoi = $scope.subject[num];

    $scope.CurentQs = num;
  };
  $scope.checkQS = function (id) {
   var traloi = $scope.cauhoi.traloi ; 
   var AnswerId = $scope.cauhoi.AnswerId; 

    if(id == traloi ){
      if(traloi == AnswerId) {
        return " text-light   bg-success";
      }else {
        return " text-light   bg-danger";
      }

    }else if(id == AnswerId ) {
      return  "text-light   bg-success";
    }else 
    return " text-dark bg-light  ";
  };



  $scope.checkQS2 = function(isCorrect) { 

    if(isCorrect) { 
      return " text-light   bg-success";

    }else if(isCorrect == null) {
      return " text-dark   bg-light";
      
    }else 
    return "text-light bg-danger";
  }
 
});


myApp.controller("mainController" , function($scope , $http) { 
  $http.get("db/Subjects.js").then(function(r){
    $scope.subjects = r.data;

  })
  $scope.fullname = sessionStorage.getItem("hoten");
  
  $scope.username = sessionStorage.getItem("username");

  $scope.isLogin =  sessionStorage.getItem("isLogin");
  $scope.logout = function(){
    $scope.fullname = null;
    $scope.username = null
    $scope.isLogin = false;
    sessionStorage.clear();
  }
})