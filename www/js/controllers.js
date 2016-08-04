angular.module('starter.controllers', [])

.controller('IntroCtrl', function($scope,$ionicPlatform, $rootScope,$ionicNavBarDelegate, $state, $location, $ionicSlideBoxDelegate)
{
  // Called to navigate to the main app

  $scope.startApp = function()
  {

    $rootScope.hideTabBar = "true";
    $location.path('tab/login');
    //flowService.setCompleteIntroduction('true');
    window.localStorage.completedIntroduction = 'true';
  };

  // At the start of this controller
  // Lets check local storage for didTutorial
  if (window.localStorage['completedIntroduction'] === 'true') {

    $scope.startApp();

  } else {
    setTimeout(function() {
      //navigator.splashscreen.hide();
    }, 750);

  }
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})


.controller('tab1Ctrl', function($scope,  $ionicPlatform,$rootScope,$state, $location, $ionicSlideBoxDelegate)
 {



   $rootScope.startApp = function() {
     //$state.go('main');
     $rootScope.hideTabBar = "";
     $location.path('/tab/empsearch');
   };

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  //$scope.startApp();

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


  ;

})

.controller('tab2Ctrl', function($scope)
 {

})




.controller('empsearchCtrl', function($scope, $http, $ionicPopup, backcallFactory) {

    backcallFactory.backcallfun(); {
      $scope.setfname = function(fname, id) {
        document.getElementById("firstName").value = fname;
        document.getElementById("searchId").value = id;
        document.getElementById("dfirstList").style.display = "none";
      }
      $scope.setlname = function(lname) {
        document.getElementById("lastName").value = lname;
        document.getElementById("dlastList").style.display = "none";
      }
      $scope.firstsearch = function(name) {
        var flag = "";
        var fname = document.getElementById("firstName").value;

        if (fname.length > 0) {
          //alert("Empty");
          if (!isNaN(fname.charAt(0))) {
            for (var i = 1; i < fname.length; i++) {
              if (isNaN(fname.charAt(i))) {
                $ionicPopup.confirm({
                  title: "Miracle ME alerts you",
                  content: "Enter valid Mobile number."
                })
              }
            }

          }
          document.getElementById("dfirstList").style.display = "block";
          //alert("include value >"+isNaN(fname.charAt(0)));
          if (fname.includes("@")) {
            flag = "E";
          } else if (!isNaN(fname.charAt(0))) {
            flag = "M";
          } else {
            flag = "N";
          }
          //alert(flag);
        } else {
          document.getElementById("dfirstList").style.display = "none";
        }
        document.getElementById("dTable").style.display = "none";

        $scope.firstName = name.firstName;
        //alert($scope.firstName.length);
        //alert("http://172.17.13.16:3000/empSearch?key="+fname+"&flag="+flag)
        $http.get("http://172.17.13.16:3000/empSearch?key=" + fname + "&flag=" + flag).then(function(response) {
          $scope.names = response.data;
          $scope.resultString = $scope.names;
        });
      }
      $scope.lastsearch = function(name) {

        var lname = document.getElementById("lastName").value;
        if (lname.length > 0) {
          //alert("Empty");
          document.getElementById("dlastList").style.display = "block";
        } else {
          document.getElementById("dlastList").style.display = "none";
        }
        document.getElementById("dTable").style.display = "none";

        $scope.lastName = name.lastName;
        //alert($scope.lastName);
        $http.get("http://172.17.13.16:3000/lastsearch?key=" + $scope.lastName).then(function(response) {
          $scope.lastnames = response.data;
          $scope.resultString2 = $scope.lastnames;
        });
      }
      $scope.search2 = function(name) {

        var fname = document.getElementById("firstName").value;
        var searchId = document.getElementById("searchId").value;
        //alert("no fname "+fname.length)
        //alert("Fname:"+fname+" lname:"+searchId);
        document.getElementById("dfirstList").style.display = "none";

        if (!fname) {
          $ionicPopup.confirm({
            title: "Miracle ME alerts you",
            content: "Empty Search not allowed"
          })
        } else {
          $http.get("http://172.17.13.16:3000/completeSearch?key=" + fname)
            .then(function(response) {
              $scope.result = response.data;
              //alert("RESULT>>"+$scope.result.length);
              if ($scope.result.length == 0) {
                document.getElementById("dTable").style.display = "none";
                $ionicPopup.confirm({
                  title: "Miracle ME alerts you",
                  content: "Sorry No Results Found!"
                })
              } else {
                document.getElementById("dTable").style.display = "block";
              }
              $scope.resultString3 = $scope.result;
            });

        }
      }
      $scope.search = function(name) {
        var fname = document.getElementById("firstName").value;
        var searchId = document.getElementById("searchId").value;
        document.getElementById("dfirstList").style.display = "none";
        document.getElementById("dlastList").style.display = "none";
        //alert($scope.fn);
        //$scope.firstname=fname;
        //$scope.lastname=lname;
        alert("Fname:" + fname + " lname:" + searchId)
          //if(!fname && !lname){
        if (!fname) {
          $ionicPopup.confirm({
            title: "Miracle ME alerts you",
            content: "Empty Search not allowed"
          })
        } else {
          //$http.get("http://172.17.13.16:3000/fullsearch?key1="+fname+"&key2="+lname)
          $http.get("http://172.17.13.16:3000/fullsearch?key1=" + fname + "&key2=" + lname)
            .then(function(response) {
              $scope.result = response.data;
              //alert("RESULT>>"+$scope.result.length);
              if ($scope.result.length == 0) {
                document.getElementById("dTable").style.display = "none";
                $ionicPopup.confirm({
                  title: "Miracle ME alerts you",
                  content: "Sorry No Results Found!"
                })
              } else {
                document.getElementById("dTable").style.display = "block";
              }
              $scope.resultString3 = $scope.result;
            });
        }


      }
    }

  })
  .controller('empindCtrl', function($scope, $rootScope, $http) {
    {
      $scope.empinddetails = function(id) {
        //alert("called "+id);
        $http.get("http://172.17.13.16:3000/getDetails?key=" + id).then(function(response) {
          $rootScope.resultString = response.data[0];
          //console.log($rootScope.islogged);
          //alert(JSON.stringify($rootScope.resultString));
        });
      }
    }
  })





.controller('emploginCtrl', [
  '$scope',
  '$window',
  '$rootScope', '$ionicNavBarDelegate', '$ionicSideMenuDelegate', '$ionicPopup', '$http', '$location', '$ionicModal', '$ionicLoading', '$ionicHistory', '$timeout',


  function($scope, $window, $rootScope, $ionicNavBarDelegate, $ionicSideMenuDelegate, $ionicPopup, $http, $location, $ionicModal, $ionicLoading, $ionicHistory, $timeout) {
    {

   if(window.localStorage['isloggedin']==='true')
      {
        //alert('reload after login');
        $ionicNavBarDelegate.showBackButton(false);
        $rootScope.hideTabBar = "";
        $rootScope.HideInstructionTab = 'true';
        $location.path('/tab/empsearch');
        $(".loginPage").hide();
        $(".empsearchPage").show();
        $(".logoutPage").show();
        //document.getElementById("loginpage").style.display = "none";
        //document.getElementById("esearchdiv").style.display = "block";
        //document.getElementById("logoutdiv").style.display = "block";
      }
      else
      {

      }
      $scope.emplogin = function(name)
      {
        //alert(localStorage.getItem('islogged'));
        $scope.username = document.getElementById("username").value;//name.username;//
        $scope.password = document.getElementById("password").value;//name.password;//
        $scope.isChecked= document.getElementById("cbox").checked;
        //alert("ischecked"+document.getElementById("cbox").checked);
        //alert(username+" "+ password);
        if (!$scope.username || !$scope.username  )
        {
          //alert("Error fill all the fields");
          $ionicPopup.confirm({
            title: "Miracle ME alerts you",
            content: "Please fill all the fields."
          })
        }
        else {
          $http.get("http://172.17.13.16:3000/login?username=" + $scope.username + "&password=" + $scope.password).
          then(function(response) {

            $scope.resultdata = response.data[0];
            if ($scope.resultdata != null) {

              //$rootScope.hideTabBar = "";
              $rootScope.HideInstructionTab = 'true';

              window.localStorage.isloggedin='true';//for logged in
              window.localStorage.isLogout='false';
              window.localStorage.firstLogin = 'true';
              window.localStorage.isCheckBox= $scope.isChecked;

              window.localStorage.uname=$scope.username;
              window.localStorage.upwd=$scope.password;
              $ionicNavBarDelegate.showBackButton(false);

              $(".loginPage").hide();
              $(".empsearchPage").show();
              $(".logoutPage").show();
              //document.getElementById("loginpage").style.display = "none";
              //document.getElementById("esearchdiv").style.display = "block";
              //document.getElementById("logoutdiv").style.display = "block";


              if (window.localStorage['completeInstruction'] === 'true')
              {
                //emp search
                $rootScope.hideTabBar = "";
                $location.path('/tab/empsearch');
              }
              else
             {
                 $location.path('/tab/tab1');
                window.localStorage.completeInstruction = 'true';

              }


            } else {
              $ionicPopup.confirm({
                title: "Miracle ME alerts you",
                content: "Please provide valid data."
              })
            }

          });
        }


      }



    }
  }
])

.controller('empLogoutCtrl',function($scope,$ionicPlatform, $window, $rootScope,$ionicLoading, $http, $location,$ionicHistory, $timeout)
{


  $scope.logout1 = function()
  {
    $rootScope.hideTabBar = 'true';
    window.localStorage.isloggedin='false';
    window.localStorage.isLogout='true';
    //window.localStorage.isCheckBox='false';
    //alert(window.localStorage['isLogout']);
    if(window.localStorage['isCheckBox'] === 'true')
    {
      //alert("is checkbox checked");

      document.getElementById('username').value=window.localStorage['uname'];//window.localStorage['uname']
      document.getElementById('password').value=window.localStorage['upwd'];
    }
    else if(window.localStorage['isCheckBox'] === 'false')
    {
      document.getElementById('username').value=null;//window.localStorage['uname']
      document.getElementById('password').value=null;
    }

    $(".loginPage").show();
    $(".empsearchPage").hide();
    $(".logoutPage").hide();
    //document.getElementById("loginpage").style.display = "block";
    //document.getElementById("esearchdiv").style.display = "none";
    //document.getElementById("logoutdiv").style.display = "none";
    //$localstorage.set('loggin_state', '');
    //window.localStorage.isCheckBox='false';
    $timeout(function() {
      $ionicLoading.hide();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
      });
      $location.path('/tab/login');
      //$state.go('tab.tab1');
    });

  };


})
.controller('menuCtrl', function($scope, $ionicPopup, $http, $location, $ionicModal, $ionicLoading, $ionicHistory, $timeout) {

  //alert("menuCtrl");
  // Form data for the login modal
  $scope.name = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/loginoverlay.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(name) {

    //alert("hi login overlay");
    //console.log('Doing login', $scope.loginData);


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username || !password) {
      //alert("no data");
      $ionicPopup.confirm({
        title: "Miracle ME alerts you",
        content: "Please fill all the fields."
      })
    } else {
      $http.get("http://172.17.13.16:3000/login?username=" + username + "&password=" + password).
      then(function(response) {
        $scope.resultdata = response.data[0];
        //alert($scope.resultdata);
        if ($scope.resultdata != null) {
          //
          document.getElementById("loginoverlay").style.display = "none";
          document.getElementById("esearchdiv").style.display = "block";
          document.getElementById("logoutdiv").style.display = "block";
          $location.path('/tab/empsearch');
        } else {
          $ionicPopup.confirm({
            title: "Miracle ME alerts you",
            content: "Please provide valid data."
          })
        }

      });
    }



    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


  $scope.logout = function() {
    //alert("logout");

    $ionicLoading.show({
      template: 'Logging out....'
    });
    document.getElementById("loginoverlay").style.display = "block";
    document.getElementById("esearchdiv").style.display = "none";
    document.getElementById("logoutdiv").style.display = "none";
    //$localstorage.set('loggin_state', '');

    $timeout(function() {
      $ionicLoading.hide();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
      });
      $location.path('/tab/tab1');
      //$state.go('tab.tab1');
    }, 30);

  };

})



.factory('backcallFactory', ['$state', '$ionicPlatform', '$ionicHistory', '$timeout', function($state, $ionicPlatform, $ionicHistory, $timeout) {

  var obj = {}
  obj.backcallfun = function() {

      $ionicPlatform.registerBackButtonAction(function(event) {
        if ($state.current.name == "tab.side1") {
          navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else {
          navigator.app.backHistory();
        }
      }, 100);

    } //backcallfun
  return obj;
}]);
