angular.module('starter',['ionic','starter.controllers','starter.services'])

.run(function($ionicPlatform,$rootScope,$location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


    //document.getElementById('username').value='123wewwf';


    if((window.localStorage['isLogout']==='true') & (window.localStorage['isCheckBox']==='true') )
    {

        //alert("is checkbox checked"+window.localStorage['uname']+window.localStorage['upwd']);
        $location.path('/tab/login');
        document.getElementById('username').value=window.localStorage['uname'];
        document.getElementById('password').value=window.localStorage['upwd'];
        document.getElementById("cbox").checked='true';
        $(".loginPage").show();
        $(".empsearchPage").show();
        $(".logoutPage").hide();

    }
    else {

    }






    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})
.config(function($stateProvider,$urlRouterProvider){

  $stateProvider

  .state('intro', {
        url: '/',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    })

  .state('tab',{
    url:'/tab',
    abstract:true,
    templateUrl:'templates/menu.html',
    //controller:'menuCtrl'
    //controller:'emploginCtrl'
  })

  .state('tab.tab1', {
    url: '/tab1',
    views: {
      'tab-one': {
        templateUrl: 'templates/tab1.html',
        controller: 'tab1Ctrl'
      }
    }
  })
.state('tab.tab2', {
    url: '/tab2',
    views: {
      'tab-two': {
        templateUrl: 'templates/tab2.html',
        controller: 'tab2Ctrl'
      }
    }
  })



.state('tab.side1',{

  url:'/empsearch',
  views:{
    'tab-side':{
      templateUrl:'templates/empsearch.html',
      controller:'empsearchCtrl'
    }
  }

})




.state('tab.empinddetails',{
  url:'/empinddetails',
  views:{
    'tab-side':{
      templateUrl:'templates/empdetails.html',
      controller:'empindCtrl'
    }
  }
})


.state('tab.side2',{

  url:'/login',
  views:{
    'tab-side':{
      templateUrl:'templates/login.html',
      controller:'emploginCtrl'
    }
  }

})


$urlRouterProvider.otherwise('/');
});
