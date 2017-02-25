var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/categories.html",
        controller:"items"
    })
    .when("/admin", {
        templateUrl : "view/admin.html"
    })
    .when("/home", {
        templateUrl : "view/home.html"
    })
    .when("/dashboard", {
        templateUrl : "view/dashboard.html"
    })
    .when("/admin/addcategories", {
        templateUrl : "view/admin/addcategories.html"
    })
    .when("/admin/addproducts", {
        templateUrl : "view/admin/addproducts.html",
        controller:"add_product"
    })
    .when("/login", {
        templateUrl : "view/login.html",
        controller:"login"
    });
});
app.controller('admin',function($scope,$http,$location) {
    $scope.myFunc = function() {
        console.log($scope.firstname);
        console.log($scope.password1);
        console.log("coming");
     // use $.param jQuery function to serialize data from JSON 
        var data = $.param({
            fName: $scope.firstname,
            lName: $scope.password1
        });
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('controller/admin.php', data, config)
        .success(function (data, status, headers, config) {
            console.log(data);
            if(data==1){
                $location.path( "/dashboard" );
            }else{
                console.log("user doesnt not exists");
            }
            $scope.PostDataResponse = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });

    };
});

app.controller('config',function($rootScope,$scope,$http,$location) {
    $scope.myFunc1 = function() {
        console.log($scope.Caterogy);
        console.log($scope.SubCaterogy);
        console.log("coming");
     // use $.param jQuery function to serialize data from JSON 
        var data = $.param({
            CName: $scope.Caterogy,
            SCName: $scope.SubCaterogy
        });
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('controller/config.php', data, config)
        .success(function (data, status, headers, config) {
            console.log(data);
            if(data==1){
                $rootScope.myFunc2();

            }else{
                //console.log("user doesnt not exists");
            }
            $scope.PostDataResponse = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });

       
    };
});
app.controller('ShowCategory',function($rootScope,$scope,$http,$location){
    $scope.myFunc2 = function(){
        $http.get('controller/getcate.php')
        .then(function(response){
            $scope.Category = response.data;
        });
    };
    $scope.myFunc2();

    $scope.myFunc4 = function(){
        console.log($scope.getcatef);
        console.log($scope.product);
var data = $.param({
            CName: $scope.getcatef,
            PName: $scope.product
        });
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('controller/config1.php', data, config)
        .success(function (data, status, headers, config) {
            console.log(data);
            if(data==1){
                //$rootScope.myFunc2();

            }else{
                //console.log("user doesnt not exists");
            }
            $scope.PostDataResponse = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });

    };

});


app.controller('login',function($rootScope,$scope,$http,$location) {

    $scope.user = {}

    $scope.submitDetails = function (){
        console.log($scope.user , "afawfqwwfq")
        if (!!$scope.user.email && !! $scope.user.password){

            $http.post('/login', $scope.user)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    if(!!data._id){
                        $location.path("#/")
                    }else{
                        alert("#/login fialed")
                    }

                })
                .error(function (data, status, header, config) {

                });
            }
        }
});




app.controller('items',function($rootScope,$scope,$http,$location) {

    $scope.items = new Array();
    console.log($location.search())

    url = "/items"

    if (!!$location.search()&& Object.keys($location.search()).length > 0 ){
        url = "/items?details="+$location.search().details
    }
    $http.get(url)
        .success(function (data, status, headers, config) {
            if(data.length > 0 ){
                $scope.items = data
                console.log($scope.items)
            }else{
                alert("#/login fialed")
            }

        })
        .error(function (data, status, header, config) {

        });
});

app.controller('add_product',function($rootScope,$scope,$http,$location) {
    $scope.item = new Object();
    $scope.add_product = function(){
        console.log($scope.item)

    $http.post('/items', $scope.item)
        .success(function (data, status, headers, config) {
            if(!!data){
                alert("added item")
            }else{
                alert("#/login fialed")
            }

        })
        .error(function (data, status, header, config) {

        });


    }
});


app.controller('search',function($rootScope,$scope,$http,$location) {

    $scope.search = function(search){
        console.log(search)
        $location.search("details",search)
    }
});

