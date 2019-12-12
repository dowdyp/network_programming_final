var messageApp = angular.module('webApp', []);
var socket = io();

function message(author, content) {
  this.author = author;
  this.content = content;
  this.time = new Date();
  return {author: this.author, id: this.author.charAt(0), content: this.content, time: this.time};
}
//app controller
messageApp.controller('appController', ['$scope', '$http',
  function($scope, $http) {

    $scope.messages = [];
    $scope.username = (localStorage.getItem('username'))?localStorage.getItem('username'):'';

    $http.get('messages')
    .then(function(response) {
          $scope.messages = response.data;
    });

    socket.on('message recieved', function(msg) {
      $scope.messages.push(msg);
      $scope.$apply();
    });

    $('#messageForm').keypress(function(e) {
      if(e.which == 13 && !e.shiftKey) {
        e.preventDefault();
        $('#submitMessage').click();
      }
    });

    $scope.sendMessage = function() {
      if ($.trim($('#messageForm').val())) {
        var payload = message($scope.username, $scope.messageInput);
        $scope.messages.push(payload);
        socket.emit('message sent', payload);
        $scope.messageInput = '';
      }
    }

    $scope.updateName = function() {
      if ($.trim($('#namenamename').val())) {
        localStorage.setItem('username', $scope.username);
        console.log("name set to " + $scope.username);
      }
    }
  }
]);
