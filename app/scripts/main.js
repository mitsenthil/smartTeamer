/**
 * Created by ss7690 on 7/27/15.
 */
/*jshint unused: vars */
require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        angular: '../bower_components/angular/angular',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'dndLists': '../bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-route': [
            'angular'
        ],
        'ui-router': [
            'angular'
        ],
        'dndLists': [
            'angular'
        ],
        'angular-cookies': [
            'angular'
        ],
        'angular-resource': [
            'angular'
        ],
        'angular-mocks': {
            deps: [
                'angular'
            ],
            exports: 'angular.mock'
        }
    },
    priority: [
        'angular'
    ],
    packages: [

    ]
});
//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require(["jquery",
    "angular",
    "app",
    'angular-route',
    'angular-cookies',
    'angular-resource',
    'ui-router',
    'dndLists'], function($, angular, app, ngRoute, ngCookies, ngResource, uiRouter, dndLists){
    $(function() {
        angular.bootstrap(document.body, [app.name]);
    });
});