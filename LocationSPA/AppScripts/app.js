/// <reference path="../Scripts/angular.js" />

var locationApp = angular.module('locationApp', ['AdalAngular']);

locationApp.config(['$httpProvider', 'adalAuthenticationServiceProvider', function ($httpProvider, adalProvider) {
    // endpoints map the address to the Web API to the app registration URI in Azure AD.
    var endpoints = {
        "https://localhost:44309/": "<location-svc-app-id-uri-in-azure-ad>"
    };

    adalProvider.init({
        instance: 'https://login.microsoftonline.com/',
        tenant: '<your-tenant>.onmicrosoft.com',
        clientId: '<app-client-id-in-azure-ad>',
        endpoints: endpoints
    }, $httpProvider);
}]);

var locationController = locationApp.controller('locationController', [
    '$scope', '$http', 'adalAuthenticationService',
    function ($scope, $http, adalService) {
        $scope.getLocation = function () {
            $http.get('https://localhost:44309/api/location?cityName=dc').then(function (location) {
                $scope.city = location.data;
            });
        };
    $scope.login = function () {
        adalService.login();
    };
    $scope.logOut = function () {
        adalService.logOut();
    };
}]);