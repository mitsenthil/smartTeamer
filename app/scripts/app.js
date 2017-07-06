/**
 * Created by ss7690 on 7/27/15.
 */
/*jshint unused: vars */
define(['angular', 'controllers/admin', 'controllers/home']/*deps*/, function (angular, AdminCtrl, HomeCtrl)/*invoke*/ {
    'use strict';

    /**
     * @ngdoc overview
     * @name smartTeamer
     * @description
     * # smartTeamer
     *
     * Main module of the application.
     */
    return angular
        .module('smartTeamer', [
            'smartTeamer.controllers.AdminCtrl',
            'smartTeamer.controllers.HomeCtrl',
/*angJSDeps*/
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ui.router',
            'dndLists'
        ])
       .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state("home", {
                    url : "/home",
                     templateUrl: "views/home.html",
                     controller: "HomeCtrl"
                })
                .state("admin", {
                    url : "/admin",
                    templateUrl: "views/admin.html",
                    controller: "AdminCtrl"
                })


        }])

});
