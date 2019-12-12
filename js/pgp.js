var messageApp = angular.module('pgpApp', []);

messageApp.controller('pgpController', ['$scope',
function($scope) {
  var pub = localStorage.getItem('public');
  var priv = localStorage.getItem('private');
  $scope.public = (pub == null)?'':pub;
  $scope.private = (priv == null)?'':priv;

  $scope.save = function() {
    localStorage.setItem('public', $scope.public);
    localStorage.setItem('private', $scope.private);
    alert("keys have been updated");
  }
}]);
