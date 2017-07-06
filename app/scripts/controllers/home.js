define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name smartTeamer.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the smartTeamer
   */
  angular.module('smartTeamer.controllers.HomeCtrl', [])
    .controller('HomeCtrl', function ($scope, $http, $timeout, $window) {
          $scope.phoneData = {};

          $scope.homeModels = {
              selected: null,
              lists: {"Today":{label:"Playing Today",value:[]},
                      "A": {label:"Team 1",value:[]},
                      "B": {label:"Team 2",value:[]}}
          };


         /* // when landing on the page, get all players and show them
          $http.get('/api/players')
              .success(function(data) {
                  $scope.players = data;
                  $scope.captain1 = $scope.players[0];
                  $scope.captain2 = $scope.players[1];
                  angular.forEach(data,function(player){

                      $scope.homeModels.lists.Squad.value.push({name:player.name,point:player.point,id:player._id});
                  });
                  console.log(data);
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });*/


          // when landing on the page, get all players and show them
          $http.get('/api/players/today')
              .success(function(data) {
                  $scope.players = data;
                  $scope.captain1 = $scope.players[0];
                  $scope.captain2 = $scope.players[1];
                  angular.forEach(data,function(player){
                      $scope.homeModels.lists.Today.value.push({name:player.name,point:player.point,id:player._id});
                  });
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });



          // Model to JSON for demo purpose
          $scope.$watch('homeModels', function(model) {
              $scope.modelAsJson = angular.toJson(model, true);
          }, true);

          $scope.printTeams = function(){

              //var printSection = document.getElementById('printSection');
              // if there is no printing section, create one
                  var printSection = document.createElement('div');
                  printSection.id = 'printSection';
                  document.body.appendChild(printSection);

              var elemToPrint = document.getElementById($scope.captain1.name);
              var elemToPrint2 = document.getElementById($scope.captain2.name);
              if (elemToPrint) {
                  var domClone = elemToPrint.cloneNode(true);
                  var domClone2 = elemToPrint2.cloneNode(true);
                  printSection.appendChild(domClone);
                  printSection.appendChild(domClone2);
                  window.print();
              }

              window.onafterprint = function () {
                  // clean the print section before adding new content
                  printSection.innerHTML = '';
              }

          }

          $scope.sendSMS = function(){
              $scope.phoneData.content = "Teams Decided";
              $scope.phoneData.phoneNumber ='+18182619419';
              $http.post('/api/send/sms', $scope.phoneData)
                  .success(function(data) {
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });
          }


      });
});
