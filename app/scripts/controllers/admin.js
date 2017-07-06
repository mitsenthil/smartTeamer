define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name smartTeamer.controller:AdminCtrl
   * @description
   * # AdminCtrl
   * Controller of the smartTeamer
   */
  angular.module('smartTeamer.controllers.AdminCtrl', [])
    .controller('AdminCtrl', function ($scope, $http, $state) {
          $scope.formData = {};
          $scope.gameData = {};

          // when submitting the add form, send the text to the node API
          $scope.createPlayer = function() {
              $http.post('/api/player/create', $scope.formData)
                  .success(function(data) {
                      $scope.formData = {}; // clear the form so our user is ready to enter another
                      $scope.players = data;
                      $scope.models.lists.Squad.value =[];
                      angular.forEach(data,function(player){
                          $scope.models.lists.Squad.value.push({name:player.name,point:player.point,id:player._id});
                      });
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });
          };

          // when submitting the add form, send the text to the node API
          $scope.createPlayingToday = function() {
              $scope.gameData.gameDate = new Date();
              $scope.gameData.players = $scope.models.lists.Today.value;
              console.log("$scope.models");
              console.log($scope.models);
              $http.post('/api/game/create',$scope.gameData)
                  .success(function(data) {
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
              });
          };

          // delete a player after checking it
          $scope.deletePlayer = function(id) {
              $http.delete('/api/player/delete/' + id)
                  .success(function(data) {
                      console.log("data");
                      console.log(data);
                      $scope.players = data;
                      $scope.models.lists.Squad.value =[];
                      angular.forEach(data,function(player){
                          $scope.models.lists.Squad.value.push({name:player.name,point:player.point,id:player._id});
                      });
                  })
                  .error(function(data) {
                      console.log('Error: ' + data);
                  });
          };



          $scope.models = {
              selected: null,
              lists: {"Squad":{label:"Squad",value:[]},
                      "Today":{label:"Playing Today",value:[]}
                     }
          };

          // when landing on the page, get all players and show them
          $http.get('/api/players')
              .success(function(data) {
                  angular.forEach(data,function(player){
                      $scope.models.lists.Squad.value.push({name:player.name,point:player.point,id:player._id});
                  });
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });



          $scope.reload = function(){
              $state.go($state.current, {}, {reload: true});
          }






      });
});
